import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import useTaskStore from '../store/taskStore';
import axiosApi from '../api/axiosInstance';

const Task = ({ id, index , title }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id,index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const editTask = useTaskStore((state) => state.editTask)
    const deleteTask = useTaskStore((state) => state.deleteTask)

    const handleEditClick = async () => {
        if (isEditing) {
            try {
                editTask(id, newTitle)
                await axiosApi.put(`/api/task/update-task/${id}`, { title: newTitle })
                    .then((res) => console.log(res))
            } catch (error) {
                console.error('error while updating task', error);

            }

        }
        setIsEditing(!isEditing);
    };

    const handleDeleteClick = async() => {
        await axiosApi.delete(`/api/task/delete-task/${id}`)
        deleteTask(id)
    };

    return (
        <li
            ref={drag}
            className={`p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'
                }`}
        >
            <div className="flex justify-between items-center">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border rounded p-1"
                    />
                ) : (
                    <span>{title}</span>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 text-white hover:cursor-pointer px-2 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Task;
