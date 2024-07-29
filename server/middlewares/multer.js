import multer from "multer"

const multerfileUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

const singleAvatar = multerfileUpload.single("avatar")
const attachmentMulter = multerfileUpload.array("files", 5)

export { singleAvatar, attachmentMulter }

