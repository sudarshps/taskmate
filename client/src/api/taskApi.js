import axiosApi from "./axiosInstance";

export const updateTaskStatusApi = async (taskId, newStatus) => {
    try {        
      const response = await axiosApi.put(`/api/task/update-task/${taskId}`, {
        status: newStatus,
      });
      return response.data.task;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error; 
    }
  };