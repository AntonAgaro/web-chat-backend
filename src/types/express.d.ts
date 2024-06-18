import { Express } from "express-serve-static-core";
import {Roles} from "./Roles";
declare module "express-serve-static-core" {
    interface Request {
        user?: {
            username: string;
            roles: {user_id: number, role_id: number, role_name: Roles}[];
        };
    }
}