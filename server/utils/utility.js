class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message),
      this.statusCode = statusCode
  }
}

const deleteFileFromCloudinary = (public_id) => {
  // Delete file from cloudinary
}

export { ErrorHandler, deleteFileFromCloudinary }