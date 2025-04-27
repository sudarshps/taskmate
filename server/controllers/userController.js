import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateToken, setToken } from "../utils/tokenUtils.js";
import passport from '../config/passport.js'


class UserController {
    constructor() { }
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            const userData = {
                name, email, password: hash
            }
            const newUser = new userModel(userData)
            const isUserRegistered = await newUser.save()
            if (!isUserRegistered) {
                return res.status(500).json({ userCreated: false, message: 'User registration failed!' })
            }
            const token = generateToken(isUserRegistered)
            setToken(res, token)

            return res.status(200).json({ userCreated: true, message: 'User registration successful' })
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.email) {

                return res.status(400).json({
                    userCreated: false,
                    message: 'Email is already registered!'
                })
            }
            return res.status(500).json({ userCreated: false, message: 'internal server error' })
        }
    }

    async userLogin(req, res) {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })
            if (!user) {
                return res.status(401).json({ valid: false, message: 'User not registered!' })
            }
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return res.status(401).json({ valid: false, message: 'Invalid password' })
            }
            const token = generateToken(user)
            setToken(res, token)

            return res.status(200).json({ valid: true, message: 'Login successful!' })
        } catch (error) {
            console.error('error in user login', error);
            return res.status(500).json({ valid: false, message: 'internal server error' })
        }
    }

    async authenticateUser(req, res) {
        try {
            passport.authenticate('jwt', { session: false }, (err, user) => {
                if (err) {
                    return res.status(500).json({ message: 'Server error during authentication' });
                }

                if (!user) {
                    return res.status(401).json({ message: 'Not authorized' });
                }

                req.user = user;
                return res.json({ user: req.user });
            })(req, res)
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:'Server error'})
        }
    }
}

export default new UserController()