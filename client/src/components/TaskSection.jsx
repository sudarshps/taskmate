import React from 'react';
import Section from './Section';

const TaskSection = ({ tasks,onStatusChange }) => {
  const sections = ['To-Do', 'In-Progress', 'Completed'];
  

  return (
    <div className="flex items-center gap-10">
      {sections.map((title, ind) => {
        const filteredTasks = tasks.filter((task) => task.status === title);        
        return (
          <Section key={ind} title={title} task={filteredTasks} onStatusChange={onStatusChange}/>
        );
      })}
    </div>
  );
};

export default TaskSection;
