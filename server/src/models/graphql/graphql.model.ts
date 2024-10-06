export const UsersTypes = `
  type User {
    id: ID!
    username: String
    email: String!
    token: String!
    role:String
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
    role:String
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;
export const QueryTypes = `  
    type Query {
    getAllUsers: [UserMainInfo]
    getAllTasks: [Task]
    me: User  
  }`;

export const TasksTypes = `
  type Task {
    id: ID!
    title: String!
    description: String!
    status:String
  }

  input TaskInput {
    title: String
    description: String
    userId:String!
    id:String
    status:String

  }`;
export const MutationTypes = `  
    type Mutation {
    registration(input: UserInput): User
    login(input: LoginInput): User
    createTask(input: TaskInput): Task
    updateTask(input: TaskInput): Task
    deleteTask(input:TaskInput): [Task]
}`;
