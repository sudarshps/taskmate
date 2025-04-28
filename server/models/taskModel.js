import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true,trim:true },
    status: {
        type: String, enum: ['To-Do', 'In-Progress', 'Completed'], default: 'To-Do',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },

})
 
const taskModel = mongoose.model('TaskModel', taskSchema)
 
export default taskModel