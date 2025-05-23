import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import AddTask from '../components/AddTask.jsx'
import axiosApi from '../api/axiosInstance.js'
import TaskSection from '../components/TaskSection.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useTaskStore from '../store/taskStore.js'

const Dashboard = () => {
  const setTasks = useTaskStore((state)=>state.setTasks)
  const tasks = useTaskStore((state) => state.tasks);

  useEffect(() => {
    fetchTasks()
  }, [tasks])

  const fetchTasks = async () => {
    try {
      await axiosApi.get('/api/task/get-task')
        .then((res) => setTasks(res.data.tasks))
    } catch (error) {

    }
  }

  const addTask = async (task) => {
    try {
      await axiosApi.post('/api/task/create-task', task)
        .then((res) => console.log(res))
    } catch (error) {
      console.error(error);
    }

  }


  return (
    <>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className='flex flex-col gap-10 items-center'>
          <AddTask createTask={addTask} />
          <TaskSection tasks={tasks} />
        </div>
      </DndProvider>

    </>
  )
}

export default Dashboard