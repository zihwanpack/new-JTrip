class UserError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'UserError';
    this.statusCode = statusCode;
  }
}

export default UserError;
