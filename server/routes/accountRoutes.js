const express = require("express");
const accountController = require("../controllers/accountController");
const router = express.Router();

router.get("/", accountController.getAll);
router.get("/:id", accountController.getById);
router.post("/", accountController.create);
router.put("/:id", accountController.update);
router.delete("/:id", accountController.delete);

module.exports = router;
