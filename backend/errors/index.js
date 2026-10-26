class BadRequestError extends Error {
  constructor(message = "Invalid request.") {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Authentication required.") {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = "Access denied.") {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = "Resource not found.") {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = "The requested action conflicts with existing data.") {
    super(message);
    this.statusCode = 409;
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
