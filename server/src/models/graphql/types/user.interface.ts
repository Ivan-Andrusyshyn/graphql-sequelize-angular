export interface User {
  username: string;
  email: string;
  password: string;
  id?: number;
}
export interface AuthArgs {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
