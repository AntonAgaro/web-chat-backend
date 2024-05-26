import CarAdRepository from "../repositories/CarAdRepository";
import {CarAd} from "../models/CarAd";
import ApiError from "../utils/error";

class CarAdService {
    async createAd(carAd: CarAd, tableName: string) {
        await CarAdRepository.createTable(tableName);
        const existingAd = await CarAdRepository.getAdByTitle(tableName, carAd.title);
        if (existingAd.length > 0) {
            throw new ApiError( 404, "Ad already exists");
        }
        return await CarAdRepository.createAd(carAd, tableName);
    }

    async getAll(tableName: string) {
        return await CarAdRepository.getAll(tableName);
    }

    async getAdByTitle(tableName: string, title: string) {
        return await CarAdRepository.getAdByTitle(tableName,  title);
    }
}

export default new CarAdService();