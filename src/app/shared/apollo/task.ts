import { gql } from 'apollo-angular';

export const CREATE_TASK = gql`
  mutation createTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($input: TaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
    }
  }
`;
export const DELETE_TASK = gql`
  mutation deleteTask($input: TaskInput!) {
    deleteTask(input: $input) {
      id
      title
      description
    }
  }
`;
export const GET_ALL_TASKS = gql`
  query {
    getAllTasks {
      id
      title
      status
      description
    }
  }
`;
