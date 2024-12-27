const express = require("express");
const accountController = require("../controllers/accountController");
const router = express.Router();
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { validateLogin } = require("../middleware/validationMiddleware");

// Public routes
router.post("/login", validateLogin, accountController.login);
router.post("/", upload.single("profilePhoto"), accountController.create);

// Protected routes
router.get("/", authMiddleware, accountController.getAll);
router.get("/:id", authMiddleware, accountController.getById);
router.put("/:id", authMiddleware, roleMiddleware("tutor"), accountController.update);
router.delete("/:id", authMiddleware, roleMiddleware("tutor"), accountController.delete);

module.exports = router;
