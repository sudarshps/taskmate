import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ id, title }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));  

  return (
    <li
      ref={drag}
      className={`p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {title}
    </li>
  );
};

export default Task;
