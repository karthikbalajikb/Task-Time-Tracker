import { GraphQLClient } from 'graphql-request';

// utils
import { getToken } from './index';

const endpoint = process.env.REACT_APP_BACKEND_BASE_URL;

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
});

export const queryService = async (query = {}) => {
  const data = await client.request(query);
  return data;
};

export const mutationService = async (mutation = {}, variable) => {
  const data = await client.request(mutation, variable);
  return data;
};
