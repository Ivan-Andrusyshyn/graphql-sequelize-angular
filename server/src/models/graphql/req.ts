export interface AuthenticatedRequest extends Request {
  isAuth?: boolean;
  userId?: string;
}
