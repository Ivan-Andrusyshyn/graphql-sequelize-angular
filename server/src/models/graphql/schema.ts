import { buildSchema } from 'graphql';

export const userSchema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }
  type UserMainInfo {
    id: ID!
    username: String!
    email: String!
    password:String!
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }
  type Task {
    id: ID!
    title: String!
    description: String!
  }

  input TaskInput {
    title: String
    description: String
    userId:String!
    id:String
  }

  type Query {
    getAllUsers: [UserMainInfo]
    getAllTasks: [Task]
    me: User  
  }

  type Mutation {
    registration(input: UserInput): User
    login(input: UserInput): User
    createTask(input: TaskInput): Task
    updateTask(input: TaskInput): Task
    deleteTask(input:TaskInput): [Task]
}
`);
