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
    const uploadPath = path.join(__dirname, "../uploads/videos");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files are allowed!"));
    }
    cb(null, true);
  },
});

// Rute CRUD Video
router.get("/", videoController.getAll); // Mendapatkan semua video
router.get("/:id", videoController.getById); // Mendapatkan detail video
router.post(
  "/",
  authMiddleware,
  roleMiddleware("tutor"),
  upload.single("videoFile"),
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
router.post("/filter", videoController.filter);

module.exports = router;
