import ApiError from './error';
// eslint-disable-next-line @typescript-eslint/ban-types
export async function errorHandler(callback: Function, message?: string) {
  try {
    return await callback();
  } catch (e) {
    console.log(e);
    throw new ApiError(500, message || 'Internal server error');
  }
}
