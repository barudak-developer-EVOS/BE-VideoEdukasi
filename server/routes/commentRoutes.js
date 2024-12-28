const express = require("express");
const commentController = require("../controllers/commentController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */

/**
 * @swagger
 * /api/comments/add-comments:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 *       401:
 *         description: Unauthorized
 */
router.post("/add-comments", authMiddleware, commentController.create);

/**
 * @swagger
 * /api/comments/get-comments/video/{id}:
 *   get:
 *     summary: Get comments by video ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Video ID
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: Video not found
 */
router.get("/get-comments/video/:id", commentController.getByVideoId);

/**
 * @swagger
 * /api/comments/delete-comments/{id}:
 *   delete:
 *     summary: Delete comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete(
  "/delete-comments/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  commentController.delete
);

module.exports = router;
