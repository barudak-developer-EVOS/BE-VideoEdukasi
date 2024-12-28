const express = require("express");
const accountController = require("../controllers/accountController");
const router = express.Router();
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { validateLogin } = require("../middleware/validationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management
 */

/**
 * @swagger
 * /api/accounts/auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post("/auth/login", validateLogin, accountController.login);

/**
 * @swagger
 * /api/accounts/accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [tutor, student]
 *     responses:
 *       201:
 *         description: Account created
 *       400:
 *         description: Bad request
 */
router.post(
  "/accounts",
  upload.single("profilePhoto"),
  accountController.create
);

/**
 * @swagger
 * /api/accounts/accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accounts
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/accounts",
  authMiddleware,
  roleMiddleware("tutor"),
  accountController.getAll
);

/**
 * @swagger
 * /api/accounts/accounts/{id}:
 *   get:
 *     summary: Get account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */
router.get(
  "/accounts/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  accountController.getById
);

/**
 * @swagger
 * /api/accounts/accounts/{id}:
 *   put:
 *     summary: Update account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [tutor, student]
 *     responses:
 *       200:
 *         description: Account updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */
router.put(
  "/accounts/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  upload.single("profilePhoto"),
  accountController.update
);

/**
 * @swagger
 * /api/accounts/accounts/{id}:
 *   delete:
 *     summary: Delete account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */
router.delete(
  "/accounts/:id",
  authMiddleware,
  roleMiddleware("tutor"),
  accountController.delete
);

module.exports = router;
