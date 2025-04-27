// import React, { useEffect, useState } from 'react';
// import { IoIosAddCircle } from "react-icons/io";
// import { MdEditSquare } from "react-icons/md";
// import { FaTrashAlt } from "react-icons/fa";
// import { TiTick } from "react-icons/ti";
// import { Draggable, Droppable } from 'react-beautiful-dnd';

// const ToDoUI = ({ tasks, addTask, updateTask, deleteTask }) => {
//   const [task, setTask] = useState('');
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editedTask, setEditedTask] = useState('');


//   const addNewTask = () => {
//     if (task.trim()) {
//       const taskDetails = {
//         title: task,
//         status: 'to-do',
//         position: tasks.length
//       }
//       addTask(taskDetails)
//       setTask('');
//     }
//   };

//   const startEditing = (index) => {
//     setEditingIndex(index);
//     setEditedTask(tasks[index].title);
//   };

//   const saveEdit = async () => {
//     if (editedTask.trim() && editedTask !== null) {
//       const taskToUpdate = tasks[editingIndex]
//       const updatedTaskDetails = {
//         title: editedTask,
//         status: taskToUpdate.status,
//         position: taskToUpdate.position,
//       };
//       updateTask(updatedTaskDetails, taskToUpdate)
//       setEditingIndex(null)
//       setEditedTask('')
//     }
//   };

//   const deleteTasks = async (index) => {
//     const taskToDelete = tasks[index]
//     deleteTask(taskToDelete._id)
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl text-center text-gray-800 mb-4">To-Do List</h1>


//       <div className="flex mb-6">
//         <input
//           type="text"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Add a new task"
//         />
//         <button
//           onClick={addNewTask}
//           className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
//         >
//           <IoIosAddCircle className='text-2xl' />
//         </button>
//       </div>

//       <Droppable droppableId='to-do'>
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps} className='bg-gray-100 p-4 rounded-lg w-1/3 shadow-lg'>
//             <ul className="space-y-4">
//               {tasks.map((t, index) => (
//                 <Draggable key={t._id} draggableId={t._id} index={index}>
//                   {(provided) => (
//                     <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={index} className="flex items-center justify-between bg-gray-200 p-4 rounded-xl">
//                       <div className="flex items-center">
//                         {editingIndex === index ? (
//                           <input
//                             type="text"
//                             value={editedTask}
//                             onChange={(e) => setEditedTask(e.target.value)}
//                             className="mr-3 p-2 border border-gray-300 rounded-md"
//                           />
//                         ) : (
//                           <span className="text-lg">{t.title}</span>
//                         )}
//                       </div>
//                       <div className="ml-4 flex items-center">
//                         {editingIndex === index ? (
//                           <button
//                             onClick={saveEdit}
//                             className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
//                           >
//                             <TiTick className='text-2xl' />
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => startEditing(index)}
//                             className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//                           >
//                             <MdEditSquare className='text-2xl' />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => deleteTasks(index)}
//                           className="ml-3 text-red-500 hover:text-red-700 focus:outline-none"
//                         >
//                           <FaTrashAlt className='text-2xl' />
//                         </button>
//                       </div>
//                       {provided.placeholder}

//                     </li>

//                   )}
//                 </Draggable>

//               ))}
//             </ul>
//           </div>
//         )}
//       </Droppable>



//     </div>
//   );
// };

// export default ToDoUI;





import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TodoColumn = ({ tasks, deleteTask }) => {
  return (
    <Droppable droppableId="todo">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 p-4 rounded-lg w-1/3 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Todo</h2>
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
                    onClick={() => deleteTask(task.id, 'todo')}
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

export default TodoColumn;
