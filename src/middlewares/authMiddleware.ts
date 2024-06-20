import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/auth.config';
import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    next();
    return;
  }

  jwt.verify(token as string, config.secret, (err, decoded) => {
    if (err || !decoded) {
      next();
      return;
    }

    const user = decoded as JwtPayload;

    req.user = {
      username: user.username ?? '',
      roles: user.roles ?? [],
    };
    console.log(req.user);
    next();
  });
}
//
// export function isAdmin(req: Request, res: Response, next: NextFunction) {}
//
// export function isModerator(req: Request, res: Response, next: NextFunction) {}
//
// export function isModeratorOrAdmin(req: Request, res: Response, next: NextFunction) {}
