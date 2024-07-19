const errorMiddleware = (err, req, res, next) => {

  err.message ||= "Internal server Error",
    err.statusCode ||= 500

  if (err.name === "CastError" && err.kind === "ObjectId") {
    err.statusCode = 404;
    err.message = "Resource Not Found"
  }

  return res.status(err.statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}

const TryCatch = (func) => async (req, res, next) => {
  try {
    await func(req, res, next)
  } catch (error) {
    next(error)
  }
}

export { errorMiddleware, TryCatch }