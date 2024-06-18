import {User} from "../models/User";
import UsersRepository from "../repositories/UsersRepository";
import UsersRolesRepository from "../repositories/UsersRolesRepository";
import {Roles} from "../types/Roles";

class UsersService {
    async createUser(user: User) {
       const res =  await UsersRepository.create(user);
       await UsersRolesRepository.create(res, Roles.User)
       return res;
    }

    async getUserByName(user: User) {
        const res = await UsersRepository.getByUserName(user)
        return res.length ? res[0] : null
    }

    async getAll() {
        return await UsersRepository.getAll()
    }

    async getUserRoles(userId: number) {
        return await UsersRolesRepository.getRolesByUserId(userId)
    }
}

export default new UsersService()