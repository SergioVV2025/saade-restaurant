const errorHandler = (err, req, res, _next) => {
  // _next para que pase eslint sin error
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal server error." : message,
  });
};

export default errorHandler;
