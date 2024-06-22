import { User } from '../models/User';
import UsersService from './UsersService';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config';

class AuthService {
  async createToken(user: User) {
    const userRoles = await UsersService.getUserRoles(user.id);
    const token = jwt.sign(
      { id: user.id, username: user.username, roles: userRoles },
      authConfig.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      },
    );

    return { userRoles, token };
  }
}

export default new AuthService();
