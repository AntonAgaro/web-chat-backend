import {errorHandler} from "../utils/functions";
import {pool} from "../db/config";
import {User} from "../models/User";
import {Tables} from "../types/Tables";
import bcrypt from 'bcrypt';

class UsersRepository {
    private tableName = Tables.Users
    async create(user: User) {
        const res = await errorHandler(async () => {
            console.log(`Creating user ${user.username}`);
            const {username, password} = user
            return await pool.query(`
            INSERT INTO ${this.tableName} (username, password) 
            VALUES ($1, $2) RETURNING *`,
                [username, bcrypt.hashSync(password, 8)]);
        });
        return res.rows[0]
    }

    async getByUserName(user: User) {
        const res = await errorHandler(async () => {
            return await pool.query(`
                SELECT * from ${this.tableName} WHERE username = $1
            `,
                [user.username])
        })

        return res.rows
    }

    async getAll() {
        const res = await errorHandler(async () => {
            return await pool.query(`
                SELECT * from ${this.tableName}
            `,
            )
        })

        return res.rows
    }
}

export default new UsersRepository()