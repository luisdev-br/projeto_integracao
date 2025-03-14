const Task = require("../models/Task");

// Criar uma tarefa
const createTask = async (req, res) => {
  const { title, projectId } = req.body;
  const userId = req.userId; // Obtém o ID do usuário autenticado

  try {
    const newTask = new Task({
      title,
      finished: false, // Tarefa começa como não concluída
      projectId,
      userId,
    });

    const savedTask = await newTask.save();
    res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: savedTask,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar tarefa", error: err });
  }
};

// Listar todas as tarefas
const getAllTasks = async (req, res) => {
  const userId = req.userId; // Obtém o ID do usuário autenticado

  try {
    const tasks = await Task.find({ userId }).populate("projectId");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error: err });
  }
};

// Atualizar uma tarefa
const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, finished } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, finished },
      { new: true } // Retorna a tarefa atualizada
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada!" });
    }

    res.json({
      message: "Tarefa atualizada com sucesso!",
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar tarefa", error: err });
  }
};

// Excluir uma tarefa
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada!" });
    }

    res.json({ message: "Tarefa excluída com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir tarefa", error: err });
  }
};

module.exports = { createTask, getAllTasks, editTask, deleteTask };