const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

// Proteger todas as rotas com autenticação
router.use(authMiddleware);

// Rotas para tarefas
router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;