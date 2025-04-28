import React from 'react';
import Section from './Section';
import useTaskStore from '../store/taskStore';

const TaskSection = () => {
  const sections = ['To-Do', 'In-Progress', 'Completed'];
  const tasks = useTaskStore((state) => state.tasks) || [];
  

  return (
    <div className="flex items-center gap-10">
      {sections.map((title, ind) => {
        const filteredTasks = tasks.filter((task) => task.status === title);        
        return (
          <Section key={ind} title={title} task={filteredTasks}/>
        );
      })}
    </div>
  );
};

export default TaskSection;
