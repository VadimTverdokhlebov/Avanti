export default class ApiValidationError extends Error {
  status: number;
  
  errors: string[];

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badValidation(message: string, errors: string[] = []) {
    return new ApiValidationError(400, message, errors);
  }
}
