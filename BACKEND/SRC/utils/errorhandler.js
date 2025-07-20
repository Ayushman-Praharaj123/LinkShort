export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message||"Internal Server Error",
  });
};
export class AppError extends Error {
  statusCode;
  isOperational;

  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
};
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
};
export class ValidationError extends AppError {
  constructor(message = "Validation error") {
    super(message, 400);
  }
};
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
};
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
};
export class ConflictError extends AppError {
  constructor(message = "Conflict error") {
    super(message, 409);
  }
};