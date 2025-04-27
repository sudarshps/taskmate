import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
    <Navbar />
    <div className='flex flex-col min-h-screen gap-6 items-center pt-16'>
      <div>
        <h1 className='font-bold text-5xl text-center mb-4 text-gray-800'>
          Simplify Your Tasks,
        </h1>
        <h1 className='font-bold text-5xl text-center mb-4 text-gray-800'>
          Stay Organized
        </h1>
      </div>

      <p className='text-lg text-center text-gray-600 max-w-2xl mx-auto leading-relaxed'>
        Take control of your day with TaskMate, your ultimate task management companion. Effortlessly organize, prioritize, and track all your tasks in one place. Whether for work, school, or personal goals, TaskMate helps you stay focused, boost productivity, and get things done with ease.
      </p>
      <Link to={'/signup'}><button className='bg-blue-500 rounded-4xl shdaow-md p-4 text-white hover:cursor-pointer hover:bg-blue-600'>Get Started</button></Link>
    </div>
  </div>
  )
}

export default Home