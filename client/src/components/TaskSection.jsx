import React from 'react';
import Section from './Section';
import useTaskStore from '../store/taskStore';

const TaskSection = () => {
  const sections = ['To-Do', 'In-Progress', 'Completed'];
  const tasks = useTaskStore((state) => state.tasks) || [];

  return (
    <div className="flex flex-wrap gap-6 justify-center md:justify-between">
      {sections.map((title, ind) => {
        const filteredTasks = tasks.filter((task) => task.status === title);
        return (
          <div 
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4" 
            key={ind}
          >
            <Section title={title} task={filteredTasks} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskSection;
