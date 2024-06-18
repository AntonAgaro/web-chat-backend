import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const res = await UsersService.getAll();
      return response.status(200).json(res);
    } catch (e) {
      next(e);
    }
  }
}

export default new UsersController();
