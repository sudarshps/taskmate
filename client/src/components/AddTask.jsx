import React, { useState } from "react";
import useTaskStore from "../store/taskStore";

export default function AddTask({createTask}) {
  const [task, setTask] = useState({
    title:'',
    status:'To-Do',
  });
  
  const tasks = useTaskStore((state)=>state.tasks)

  const handleCreate = () => {
    if (task.title.trim() !== "") {
      createTask(task)
      setTask({
        title:'',
        status:'To-Do',
      });
    }
  };

  const handleChange = (e) => {
    setTask((prev)=>({
        ...prev,
        title:e.target.value,
    }))
  }  

  return (
    <div className="mt-4 px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl font-bold mb-4 text-center">Create a Task</h1>
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
      <input
        type="text"
        value={task.title}
        onChange={handleChange}
        placeholder="Enter your task..."
        className="w-full sm:flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white hover:cursor-pointer px-5 py-3 rounded-xl hover:bg-blue-600 transition-all sm:w-auto w-full"
      >
        Create
      </button>
    </div>
  </div>
  
  );
}
