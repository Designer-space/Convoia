class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message),
      this.statusCode = statusCode
  }
}

const deleteFileFromCloudinary = (public_id) => {
  // Delete file from cloudinary
}

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 100,
  httpOnly: true, // Prevent XSS attack cross-site scripting sttacks
  sameSite: "strict", //CSRF attack cross-site request forgery sttacks
  secure: process.env.NODE_ENV !== "development"
}

export { ErrorHandler, deleteFileFromCloudinary, cookieOptions }