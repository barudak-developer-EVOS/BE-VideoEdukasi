const express = require("express");
const videoController = require("../controllers/videoController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

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
