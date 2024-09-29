import { gql } from 'apollo-angular';

export const REGISTER_USER = gql`
  mutation ($input: UserInput) {
    registration(input: $input) {
      id
      username
      email
      token
    }
  }
`;
export const LOGIN_USER = gql`
  mutation ($input: UserInput) {
    login(input: $input) {
      id
      username
      email
      token
    }
  }
`;
export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      email
      password
    }
  }
`;
