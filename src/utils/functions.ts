import ApiError from "./error";

export async function errorHandler(callback: Function, message?: string) {
    try {
        return await callback()
    } catch (e) {
        console.log(e)
        throw new ApiError( 500, message || "Internal server error",)
    }
}