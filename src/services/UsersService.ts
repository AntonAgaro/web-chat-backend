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

    async checkUserAlreadyExist(user: User) {
        const res = await UsersRepository.getByUserName(user)
        console.log(res)
        return !!res.length
    }

    async getAll() {
        return await UsersRepository.getAll()
    }
}

export default new UsersService()