const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (file.fieldname === "profilePhoto") {
      uploadPath = path.join(__dirname, "../uploads/profile_photos");
    } else if (file.fieldname === "videoFile") {
      uploadPath = path.join(__dirname, "../uploads/videos");
    } else if (file.fieldname === "thumbnail") {
      uploadPath = path.join(__dirname, "../uploads/thumbnails");
    } else {
      return cb(new Error("Invalid file field name!"), false);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Filter file berdasarkan tipe
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profilePhoto" && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for profile photos!"), false);
  }
  if (file.fieldname === "videoFile" && !file.mimetype.startsWith("video/")) {
    return cb(new Error("Only video files are allowed!"), false);
  }
  if (file.fieldname === "thumbnail" && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for thumbnails!"), false);
  }
  cb(null, true);
};

// Middleware multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
