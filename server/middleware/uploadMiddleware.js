const multer = require("multer");
const path = require("path");

// Daftar ekstensi yang diizinkan untuk setiap jenis file
const allowedExtensions = {
  profilePhoto: [".jpg", ".jpeg", ".png"],
  videoFile: [".mp4", ".mkv", ".avi"],
  thumbnail: [".jpg", ".jpeg", ".png"],
};

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

// Filter file berdasarkan tipe dan ekstensi
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions[file.fieldname]?.includes(ext)) {
    return cb(
      new Error(
        `Invalid file type for ${
          file.fieldname
        }! Allowed extensions: ${allowedExtensions[file.fieldname].join(", ")}`
      ),
      false
    );
  }

  cb(null, true);
};

// Middleware multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
