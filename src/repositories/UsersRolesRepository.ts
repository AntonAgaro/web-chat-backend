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
}

export default new UsersRolesRepository()