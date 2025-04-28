import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';

const Section = ({ title, task,onStatusChange }) => {
  const [color, setColor] = useState('bg-blue-500');

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
      onStatusChange(item.id, title);
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
        {task && task.length > 0 ? (
          task.map((tsk) => (
            <Task key={tsk._id} id={tsk._id} title={tsk.title} />
          ))
        ) : (
          <li className="text-gray-400 text-center">No tasks</li>
        )}
      </ul>
    </div>
  );
};

export default Section;
