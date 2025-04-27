import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


const jwtSecret = process.env.JWT_SECRET

export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: '1d'
    })
}

export const setToken = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
}