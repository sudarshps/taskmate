import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true,trim:true },
    status: {
        type: String, enum: ['to-do', 'in-progress', 'completed'], default: 'to-do',
    },
    position: { type: Number,require:true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
})

const taskModel = mongoose.model('TaskModel', taskSchema)

export default taskModel