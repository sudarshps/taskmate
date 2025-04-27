import taskModel from "../models/taskModel.js";


class TaskController {
    constructor() { }
    async createTask(req, res) {
        try {
            const { title, status, position } = req.body
            const userId = req.user._id
            const task = await taskModel.create({ title, status, position, user: userId })
            return res.status(201).json({ task, message: 'Task created succesfully' })
        } catch (error) {
            console.error('Error creating task', error);
            return res.status(500).json({ message: 'internal server error' })
        }
    }
    async getTasks(req, res) {
        try {
            const userId = req.user._id
            const tasks = await taskModel.find({ user: userId }).sort({ position: 1 })
            res.status(200).json({ tasks })
        } catch (error) {
            console.error('Error fetching task', error);
            return res.status(500).json({ message: 'internal server error' })
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params
            const { title, status, position } = req.body;

            const updatedTask = await taskModel.findByIdAndUpdate(id, { title, status, position }, { new: true })

            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json({ task: updatedTask, message: "Task updated successfully" });
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;

            const deletedTask = await taskModel.findByIdAndDelete(id);

            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json({ message: "Task deleted successfully" });   
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new TaskController()