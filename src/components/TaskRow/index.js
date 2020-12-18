/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';

// components
import Button from '../Button';
import TagDropdown from '../TagDropdown';

// queries
import { UPDATE_TASK } from '../../queries/tasks';

// utils
import { mutationService } from '../../utils/apiService';

const TaskRow = ({
  id, title, start_time, end_time, onDelete,
}) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const queryClient = useQueryClient();
  const isStarted = !!start_time;
  const isEnded = !!end_time;

  const mutation = useMutation(
    async (body) => mutationService(UPDATE_TASK, body),
    {
      onMutate: (data) => {
        queryClient.cancelQueries('tasks');
      },
      onSuccess: async (data, variables, context) => {
        queryClient.refetchQueries('tasks');
      },
      onError: (error, variables, context) => {
        console.log('error >>', error);
      },
      onSettled: (data, error, variables, context) => {},
    },
  );

  const handleTitleUpdate = (event) => {
    setTaskTitle(event.target.value);
    // Todo : debounce
    mutation.mutate({
      id: {
        id,
      },
      body: {
        title: event.target.value,
      },
    });
  };

  const handleStart = (event) => {
    mutation.mutate({
      id: {
        id,
      },
      body: {
        start_time: new Date().toISOString(),
      },
    });
  };

  const handleStop = (event) => {
    mutation.mutate({
      id: {
        id,
      },
      body: {
        end_time: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="flex justify-between my-4 p-3 hover:shadow-md shadow-sm">
      <div className="flex w-full">
        <input
          className="w-1/2 border border-solid rounded px-4 leading-tight text-sm font-normal placeholder-gray-500 placeholder-opacity-75 mr-12"
          type="text"
          value={taskTitle}
          onChange={handleTitleUpdate}
        />
        <TagDropdown />
      </div>
      <Button
        label="Delete"
        size="medium"
        className="bg-red-400 ml-2 px-2"
        onClick={onDelete}
      />
      <Button
        label={!isStarted && !isEnded ? 'Start' : isStarted && !isEnded ? 'Stop' : 'Done'}
        size="medium"
        disabled={isEnded}
        className={`${!isStarted && !isEnded ? 'bg-green-400' : isStarted && !isEnded ? 'bg-yellow-400' : 'bg-black'}  ml-2 px-2`}
        onClick={isStarted ? handleStop : handleStart}
      />
    </div>
  );
};

TaskRow.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};
export default TaskRow;
