import { gql } from 'graphql-request';

export const CREATE_TASK = gql`
  mutation CreateTask($body: tasks_insert_input!) {
    insert_tasks_one(object: $body) {
      id
      title
      task_tags {
        tag_id
      }
      end_time
      start_time
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: tasks_pk_columns_input!, $body: tasks_set_input) {
    update_tasks_by_pk(_set: $body, pk_columns: $id) {
      title
      start_time
      end_time
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    delete_tasks_by_pk(id: $id) {
      id
    }
  }
`;

export const GET_TASKS = gql`
  query Tasks {
    tasks(order_by: { created_at: asc }) {
      id
      title
      end_time
      start_time
    }
  }
`;

// To be implemented
export const SEARCH_TASKS_BY_TITLE = gql`
  query SearchTasks($name: String!) {
    tasks(where: { title: { _eq: $name } }) {
      id
      title
      task_tags {
        tag {
          name
        }
      }
      end_time
      start_time
    }
  }
`;
