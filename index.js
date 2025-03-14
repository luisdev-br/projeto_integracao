const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");



const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware para ler o corpo das requisições como JSON
app.use(bodyParser.json());

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Rotas de tarefas
app.use("/api/tasks", taskRoutes);

// Rotas de projetos
app.use("/api/projects", projectRoutes);

// Rotas de perfis
app.use("/api/profiles", profileRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});