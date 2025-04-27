import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ title, tasks, deleteTask, columnId }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 p-4 rounded-lg w-1/3 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white p-4 mb-4 rounded-lg shadow-md hover:bg-gray-200 flex justify-between items-center"
                >
                  <span>{task.name}</span>
                  <button
                    onClick={() => deleteTask(task.id, columnId)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export const InProgressColumn = ({ tasks, deleteTask }) => (
  <Column title="In Progress" tasks={tasks} deleteTask={deleteTask} columnId="inProgress" />
);

export const CompletedColumn = ({ tasks, deleteTask }) => (
  <Column title="Completed" tasks={tasks} deleteTask={deleteTask} columnId="completed" />
);
