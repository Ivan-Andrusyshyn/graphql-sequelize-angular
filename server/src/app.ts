import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import helmet from 'helmet';

import { userSchema } from './models/graphql/schema';
import { usersResolvers } from './models/graphql/resolver';
import { corsOptions } from './config/cors';
import { authMiddleware } from './middleware/authMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(authMiddleware);

app.use(
  '/graphql',
  graphqlHTTP((req: any) => ({
    schema: userSchema,
    rootValue: usersResolvers,
    graphiql: true,
    context: { isAuth: req.isAuth, userId: req.userId },
  }))
);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
