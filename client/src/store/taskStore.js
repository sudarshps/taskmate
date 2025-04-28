import {create} from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  editTask: (id, newTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, title: newTitle } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== id),
    })),
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (taskId,index, newStatus) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task._id === taskId ? { ...task, status: newStatus } : task
    )
  })),
}));

export default useTaskStore;
