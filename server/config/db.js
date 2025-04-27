import mongoose from 'mongoose'

const connectDb = async() => {
    try {
        const mongoUri = process.env.MONGO_URI
        if(!mongoUri){
            throw new Error('mongo uri is not defined')
        }
        await mongoose.connect(mongoUri)
    } catch (error) {
        console.error('error while connecting to mongodb',error);
    }
}

export default connectDb