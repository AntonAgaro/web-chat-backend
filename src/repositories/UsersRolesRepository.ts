import {Tables} from "../types/Tables";
import {User} from "../models/User";
import {Roles} from "../types/Roles";
import {errorHandler} from "../utils/functions";
import {pool} from "../db/config";
import ApiError from "../utils/error";
class UsersRolesRepository {
    private tableName = Tables.UsersRoles
     async create(user: User, role: Roles) {
        const res = await errorHandler(async () => {
            const roleIdRequest =  await pool.query(`
            SELECT id FROM ${Tables.Roles} WHERE name = '${role}'`,
            );
            if (!roleIdRequest.rows.length) {
                throw new ApiError(500, 'No role with this name!')
            }
            const roleId = roleIdRequest.rows[0].id
            return await pool.query(`INSERT INTO ${Tables.UsersRoles} (user_id, role_id)
                    VALUES ('${user.id}', '${roleId}')
                `)
        });
        return res.rows[0]
    }

    async getRolesByUserId(userId: number) {
        const res = await errorHandler( async () => {
            return await pool.query(`
                SELECT ur.user_id, ur.role_id, r.name as role_name
                FROM users_roles as ur
                LEFT JOIN role as r
                ON ur.role_id = r.id
                WHERE user_id = ${userId}
                `)
        })
        return res.rows
    }
}

export default new UsersRolesRepository()