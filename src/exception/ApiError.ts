export default class ApiError extends Error {
  status;

  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorization() {
    return new ApiError(401, 'User is not login');
  }

  static badRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}
