/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { useQuery, useMutation, useQueryClient } from 'react-query';

// queries
import { GET_ALL_TAGS, CREATE_TAG } from '../../queries/tags';

// utils
import { queryService, mutationService } from '../../utils/apiService';

const TagDropdown = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery('tags', async () => queryService(GET_ALL_TAGS));

  const mutation = useMutation(
    async (body) => mutationService(CREATE_TAG, body),
    {
      onSuccess: () => {
        queryClient.refetchQueries('tags');
      },
    },
  );

  const handleChange = (newValue, actionMeta) => {
    // Todo - map to task
    switch (actionMeta.action) {
      case 'create-option': {
        mutation.mutate({
          body: {
            name: newValue[0]?.value,
          },
        });
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="w-1/6">
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={data?.tags.map(({ id, name }) => ({ value: id, label: name }))}
      />
    </div>
  );
};

export default TagDropdown;
