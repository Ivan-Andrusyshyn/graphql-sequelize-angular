import { buildSchema } from 'graphql';
import {
  MutationTypes,
  QueryTypes,
  TasksTypes,
  UsersTypes,
} from './graphql.model';

export const userSchema = buildSchema(`
${UsersTypes}
${TasksTypes}
${QueryTypes}
${MutationTypes}
`);
