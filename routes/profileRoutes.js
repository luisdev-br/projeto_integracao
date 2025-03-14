const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

// Proteger todas as rotas com autenticação
router.use(authMiddleware);

// Rotas para perfis
router.post("/", profileController.createProfile);
router.get("/", profileController.getAllProfiles);
router.put("/:id", profileController.editProfile);
router.delete("/:id", profileController.deleteProfile);

module.exports = router;