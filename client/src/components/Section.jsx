import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';
import useTaskStore from '../store/taskStore';
import { updateTaskStatusApi } from '../api/taskApi';

const Section = ({ title }) => {
  const [color, setColor] = useState('bg-blue-500');
const tasks = useTaskStore((state) => state.tasks);
const filteredTasks = tasks.filter((task) => task.status === title);
const updateStatus = useTaskStore((state)=>state.updateTaskStatus)



const handleStatusChange = async(taskId,index,newStatus) => {
    try {      
        updateStatus(taskId,index, newStatus);
       await updateTaskStatusApi(taskId, newStatus);
      } catch (error) {
        console.error('Failed to update task status:', error);
      }
}

  useEffect(() => {
    if (title === 'In-Progress') {
      setColor('bg-orange-500');
    } else if (title === 'Completed') {
      setColor('bg-green-500');
    }
  }, [title]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
        handleStatusChange(item.id, item.index , title);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="bg-white rounded-2xl shadow-lg p-6 w-80">
      <div className={`text-white text-center py-3 rounded-xl mb-4 font-bold text-lg ${color}`}>
        {title}
      </div>

      <ul className="flex flex-col gap-3">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((tsk,ind) => (
            <Task key={tsk._id} id={tsk._id} index={ind} title={tsk.title} />
          ))
        ) : (
          <li className="text-gray-400 text-center">No tasks</li>
        )}
      </ul>
    </div>
  );
};

export default Section;
