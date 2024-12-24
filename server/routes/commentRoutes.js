const express = require("express");
const commentController = require("../controllers/commentController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Tambah komentar (akses untuk semua pengguna yang login)
router.post("/", authMiddleware, commentController.create);

// Lihat komentar pada video tertentu (akses publik)
router.get("/video/:id", commentController.getByVideoId);

// Hapus komentar (hanya untuk pemilik komentar atau tutor)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  commentController.delete
);

module.exports = router;
