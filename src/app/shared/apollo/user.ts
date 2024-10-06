import { gql } from 'apollo-angular';

export const REGISTER_USER = gql`
  mutation ($input: UserInput) {
    registration(input: $input) {
      id
      username
      email
      role
      token
    }
  }
`;
export const LOGIN_USER = gql`
  mutation ($input: LoginInput) {
    login(input: $input) {
      id
      username
      email
      role
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
      role
      password
    }
  }
`;
