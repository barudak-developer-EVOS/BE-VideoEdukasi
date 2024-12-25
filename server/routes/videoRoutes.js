const express = require("express");
const multer = require("multer");
const videoController = require("../controllers/videoController");
const path = require("path");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Path ke folder src/uploads/videos
    const uploadPath =
      file.fieldname === "videoFile"
        ? path.join(__dirname, "../uploads/videos")
        : path.join(__dirname, "../uploads/thumbnails");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Middleware multer untuk multiple file upload
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "videoFile" && !file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files are allowed!"));
    }
    if (file.fieldname === "thumbnail" && !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed for thumbnails!"));
    }
    cb(null, true);
  },
});

// Rute CRUD Video

// Public Routes
router.get("/", videoController.getAll); // Mendapatkan semua video

router.get("/:id", videoController.getById); // Mendapatkan detail video

// Private Routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("tutor"),
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  videoController.create
); // Menambahkan video

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  videoController.update
); // Mengedit video

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  videoController.delete
); // Menghapus video

// Rute filter video
router.get("/filter/educationLevel", videoController.filterByEducationLevel); // Filter video berdasarkan tingkat pendidikan
router.get("/filter/subject", videoController.filterBySubject); // Filter video berdasarkan mata pelajaran

module.exports = router;
