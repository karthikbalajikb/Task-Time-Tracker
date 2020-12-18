import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

// components
import CreateTask from '../components/CreateTask';
import TaskRow from "../components/TaskRow";
import Toolbar from "../components/Toolbar";

// queries
import { GET_TASKS, DELETE_TASK } from "../queries/tasks";

// utils
import { queryService, mutationService } from "../utils/apiService";

const TimeTracking = () => {
  const queryClient = useQueryClient();

  const useTasks = () => {
    return useQuery("tasks", async () => queryService(GET_TASKS));
  };

  const mutation = useMutation(
    async (taskId) => mutationService(DELETE_TASK, taskId), {
      onSuccess: (data, variables, context) => {
        queryClient.refetchQueries('tasks')
      }
    }
  )

  const handleDelete = (event, id) => {
    mutation.mutate({ id })
  }

  const { status, data, error, isFetching } = useTasks();
  return (
    <div className="ml-16">
      <Toolbar />
      <CreateTask />
      <h1 className="ml-16">Tasks</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div className="m-12">
              {data.tasks.map((task) => (
                <TaskRow key={task.id} {...task} onDelete={(event) => handleDelete(event, task.id)} />
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeTracking;