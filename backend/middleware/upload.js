const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "myapp",

    allowed_formats: ["jpg", "png", "jpeg", "webp"],

    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname;
    },
  },
});

// Multer Upload
const upload = multer({
  storage,
});

module.exports = upload;