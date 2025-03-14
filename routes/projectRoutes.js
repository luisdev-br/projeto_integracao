const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Proteger todas as rotas com autenticação
router.use(authMiddleware);

// Rotas para projetos
router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.put("/:id", projectController.editProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;