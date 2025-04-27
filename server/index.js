import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import connectDb from './config/db.js'
import userRoute from './routes/userRoutes.js'
import passport from './config/passport.js'
import cookieParser from 'cookie-parser'

connectDb()
const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(passport.initialize())
app.use(cookieParser())

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:['GET','POST','PUT','PATCH'],
    credentials:true
}))

app.use('/api/user',userRoute)


app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
})