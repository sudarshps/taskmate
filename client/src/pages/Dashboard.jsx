// import React, { useEffect, useState } from 'react'
// import ToDoUI from '../components/ToDo'
// import Navbar from '../components/Navbar'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import axiosApi from '../api/axiosInstance'


// const Dashboard = () => {
//   const [tasks, setTasks] = useState([])

//   useEffect(() => {
//     fetchTaskList()
//   }, [])

//   const fetchTaskList = async () => {
//     try {
//       const res = await axiosApi.get('/api/task/get-task');
//       setTasks(res.data.tasks)
//     } catch (error) {
//       console.error('error fetching tasks', error);
//     }
//   }

//   const handleAddTask = async (task) => {
//     try {
//       const { data } = await axiosApi.post('/api/task/create-task', task)
//       setTasks([...tasks, data.task]);
//     } catch (error) {

//     }
//   }

//   const handleUpdateTask = async (task, taskid) => {
//     try {
//       await axiosApi.put(`/api/task/update-task/${taskid._id}`, task)
//       const updatedTasks = tasks.map((task, ind) => ind === editingIndex ? { ...task, title: editedTask } : task)
//       setTasks(updatedTasks)
//     } catch (error) {

//     }

//   }


//   const handleDelete = async (taskid) => {
//     try {
//       await axiosApi.delete(`/api/task/delete-task/${taskid}`)
//       setTasks(tasks.filter((_, i) => i !== index));
//     } catch (error) {

//     }


//   }

//   const onDragEnd = async (result) => {
//     const { source, destination } = result;
//     console.log(source,destination);
    
//     if (!destination) return; // Dropped outside

//     if (source.index === destination.index && source.droppableId === destination.droppableId)
//       return; // Dropped in the same spot

//     // Reorder tasks
//     const updatedTasks = Array.from(tasks);
//     const [movedTask] = updatedTasks.splice(source.index, 1);
//     movedTask.status = destination.droppableId; // Change status when dropped
//     updatedTasks.splice(destination.index, 0, movedTask);

//     setTasks(updatedTasks);

//     // Update the task's status in the backend
//     // try {
//     //   await axiosApi.put(`/api/task/update-task/${movedTask._id}`, { status: movedTask.status });
//     // } catch (error) {
//     //   console.error('Error updating task status', error);
//     // }
//   };

//   return (
//     <div>
//       <Navbar />
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className='grid grid-cols-3 gap-4 p-6'>
//               <div className='space-y-4 min-h-[200px]'>
//                 <ToDoUI tasks={tasks.filter(task => task.status === 'to-do')} addTask={handleAddTask} updateTask={handleUpdateTask} deleteTask={handleDelete} />
//               </div>
//         </div>
//       </DragDropContext>
//     </div>
//   )
// }

// export default Dashboard





import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import TodoColumn from '../components/ToDo';
import { InProgressColumn,CompletedColumn } from '../components/InProgress';
import axiosApi from '../api/axiosInstance.js'

const initialData = {
  todo: [],
  inProgress: [],
  completed: [],
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialData);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    if (startColumn === endColumn && source.index === destination.index) {
      return;
    }

    const newTasks = { ...tasks };
    const draggedTask = newTasks[startColumn][source.index];
    newTasks[startColumn].splice(source.index, 1);
    newTasks[endColumn].splice(destination.index, 0, draggedTask);

    setTasks(newTasks);

    await axios.put('/api/update-task', { taskId: draggableId, newStatus: endColumn });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axiosApi.get('/api/task/get-tasks');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const addTask = async (taskName) => {
    const newTask = { title: taskName, status: 'to-do',position:0 };
    await axiosApi.post('/api/task/create-task', newTask);

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const deleteTask = async (taskId, column) => {
    await axiosApi.delete(`/api/delete-task/${taskId}`);

    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Kanban Board</h1>
      <div className="text-center mb-4">
        <button
          onClick={() => addTask(prompt('Enter task name:'))}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between space-x-4">
          <TodoColumn tasks={tasks.todo} deleteTask={deleteTask} />
          <InProgressColumn tasks={tasks.inProgress} deleteTask={deleteTask} />
          <CompletedColumn tasks={tasks.completed} deleteTask={deleteTask} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
