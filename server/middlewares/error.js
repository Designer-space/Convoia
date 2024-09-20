const errorMiddleware = (err, req, res, next) => {

  if (err.name === "CastError" && err.kind === "ObjectId") {
    err.statusCode = 404;
    err.message = `Invalid Format of ${err.path}`;
  }

  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  err.message ||= "Internal server Error",
    err.statusCode ||= 500;


  return res.status(err.statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

const TryCatch = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, TryCatch };