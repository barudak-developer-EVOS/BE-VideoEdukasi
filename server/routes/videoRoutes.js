const express = require("express");
const videoController = require("../controllers/videoController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management
 */

/**
 * @swagger
 * /api/videos/getAll-videos:
 *   get:
 *     summary: Retrieve a list of videos
 *     tags: [Videos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of videos per page
 *     responses:
 *       200:
 *         description: A list of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       500:
 *         description: Internal server error
 */
router.get("/getAll-videos", videoController.getAll);

/**
 * @swagger
 * /api/videos/get-videos/{id}:
 *   get:
 *     summary: Retrieve a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: A single video
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
router.get("/get-videos/:id", videoController.getById);

/**
 * @swagger
 * /api/videos/upload-videos:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               videoFile:
 *                 type: string
 *                 format: binary
 *                 description: The video file
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The thumbnail image
 *               title:
 *                 type: string
 *                 example: My Awesome Video
 *               description:
 *                 type: string
 *                 example: A description of the video
 *               educationLevel:
 *                 type: string
 *                 enum: [SD, SMP, SMA]
 *               subject:
 *                 type: string
 *                 enum: [PPKn, Bahasa Indonesia, Matematika, IPA, IPS, Agama, PJOK]
 *     responses:
 *       201:
 *         description: Video created successfully
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Only tutors can create videos
 *       500:
 *         description: Internal server error
 */
router.post(
  "/upload-videos",
  authMiddleware,
  roleMiddleware("tutor"),
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  videoController.create
);

/**
 * @swagger
 * /api/videos/update-videos/{id}:
 *   put:
 *     summary: Update a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *                 enum: [SD, SMP, SMA]
 *               subject:
 *                 type: string
 *                 enum: [PPKn, Bahasa Indonesia, Matematika, IPA, IPS, Agama, PJOK]
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Only tutors can update videos
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update-videos/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  videoController.update
);

/**
 * @swagger
 * /api/videos/delete-videos/{id}:
 *   delete:
 *     summary: Delete a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       403:
 *         description: Only tutors can delete videos
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/delete-videos/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  videoController.delete
);

/**
 * @swagger
 * /api/videos/filter-by-education:
 *   get:
 *     summary: Filter videos by education level
 *     tags: [Videos]
 *     parameters:
 *       - in: query
 *         name: educationLevel
 *         schema:
 *           type: string
 *           enum: [SD, SMP, SMA]
 *         required: true
 *         description: Education level to filter by
 *     responses:
 *       200:
 *         description: Videos filtered by education level
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       422:
 *         description: Invalid query parameter
 *       500:
 *         description: Internal server error
 */

router.get("/filter-by-education", videoController.filterByEducationLevel);

/**
 * @swagger
 * /api/videos/filter-by-subject:
 *   get:
 *     summary: Filter videos by subject and education level
 *     tags: [Videos]
 *     parameters:
 *       - in: query
 *         name: educationLevel
 *         schema:
 *           type: string
 *           enum: [SD, SMP, SMA]
 *         required: true
 *         description: Education level to filter by
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *           enum: [PPKn, Bahasa Indonesia, Matematika, IPA, IPS, Agama, PJOK]
 *         required: true
 *         description: Subject to filter by
 *     responses:
 *       200:
 *         description: Videos filtered by subject and education level
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       422:
 *         description: Invalid query parameter
 *       500:
 *         description: Internal server error
 */

router.get("/filter-by-subject", videoController.filterBySubject);

/**
 * @swagger
 * /api/videos/videos/{id}/view:
 *   post:
 *     summary: Increment video views
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: View count incremented successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
router.post("/videos/:id/view", videoController.incrementViews);

/**
 * @swagger
 * /api/videos/videos/{id}/like:
 *   post:
 *     summary: Increment video likes
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Like count incremented successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
router.post("/videos/:id/like", videoController.incrementLikes);

/**
 * @swagger
 * /api/videos/videos/{id}/dislike:
 *   post:
 *     summary: Increment video dislikes
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Dislike count incremented successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
router.post("/videos/:id/dislike", videoController.incrementDislikes);

module.exports = router;
