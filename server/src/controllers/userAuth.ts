import bcrypt from 'bcryptjs';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { AuthArgs } from '../models/graphql/user.model';
import { Users } from '../models/user-sequelize';

const jwtKey = process.env.JWT_KEY;
if (!jwtKey) {
  throw new Error('JWT key is not defined');
}

export const registration = async (
  { input }: { input: AuthArgs },
  req: Request
) => {
  const { username, email, password } = input;

  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }

  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    username,
    email,
    password: hashedPassword,
  };
  const createdUser = await Users.create(newUser);

  const token = jwt.sign({ userId: createdUser.id }, jwtKey, {
    expiresIn: '1h',
  });

  return {
    id: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
    token: token,
  };
};

export const login = async ({ input }: { input: AuthArgs }, req: Request) => {
  const { username, email, password } = input;

  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new Error('No user with this email');
  }

  const token = jwt.sign({ userId: user.id }, jwtKey, {
    expiresIn: '1h',
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token: token,
  };
};

export const getAllUsers = async () => {
  return await Users.findAll();
};
