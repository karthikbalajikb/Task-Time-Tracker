import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

// components
import Button from '../Button';

// queries
import { CREATE_TASK } from '../../queries/tasks';

// utils
import { mutationService } from '../../utils/apiService';

const CreateTask = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (body) => mutationService(CREATE_TASK, body),
    {
      onSuccess: async () => {
        queryClient.refetchQueries('tasks');
        setTitle('');
      },
      onError: (error) => {
        console.log('error >>', error);
      },
      onSettled: () => {},
    },
  );

  if (!showForm) {
    return (
      <Button
        label="+ New Task"
        size="medium"
        className="bg-primary ml-2 px-2"
        onClick={() => setShowForm(true)}
      />
    );
  }

  const handleSave = (event) => {
    event.preventDefault();
    mutation.mutate({ body: { title } });
  };

  return (
    <div className="flex items-center justify-between h-12 px-4 py-2 mr-8 bg-white border border-gray-300 rounded-lg">
      <div className="flex flex-1 items-center">
        {/* Title */}
        <div className="inline-flex flex-1 items-center mr-3">
          <input
            placeholder="create new task"
            className="w-full border border-solid rounded focus:outline-none px-4 leading-tight text-sm font-normal placeholder-gray-500 placeholder-opacity-75 h-8"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      {/* CTA's */}
      <div className="flex ml-8">
        <Button
          variant="text"
          label="Cancel"
          onClick={() => { setShowForm(false); setTitle(''); }}
        />
        <Button
          label="Save"
          size="medium"
          className="bg-primary ml-2 px-2"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default CreateTask;
