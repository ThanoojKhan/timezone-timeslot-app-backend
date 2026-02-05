export interface AppErrorOptions {
  name?: string;
  statusCode: number;
  message: string;
  error?: unknown;
  isOperational?: boolean;
}

export default class AppError extends Error {
  public statusCode: number;
  public error?: unknown;
  public isOperational: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = options.name ?? "Error";
    this.statusCode = options.statusCode;
    this.error = options.error;
    this.isOperational = options.isOperational ?? true;

    Error.captureStackTrace(this, this.constructor);
  }
}