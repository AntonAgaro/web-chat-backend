// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express-serve-static-core';
import { Roles } from './Roles';
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      username: string;
      roles: { user_id: number; role_id: number; role_name: Roles }[];
    };
  }
}
