const Project = require("../models/Project");


const createProject = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  const userId = req.userId; 

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      userId,
    });

    const savedProject = await newProject.save();

    
    res.status(201).json({
      message: "Projeto criado com sucesso!",
      project: {
        name: savedProject.name,
        description: savedProject.description,
        startDate: savedProject.startDate,
        endDate: savedProject.endDate,
        _id: savedProject._id,
        userId: savedProject.userId, 
        __v: savedProject.__v,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar projeto", error: err });
  }
};


const getAllProjects = async (req, res) => {
  const userId = req.userId; 

  try {
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar projetos", error: err });
  }
};


const editProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate },
      { new: true } 
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Projeto não encontrado!" });
    }

    res.json({
      message: "Projeto atualizado com sucesso!",
      project: updatedProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar projeto", error: err });
  }
};

// Excluir um projeto
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Projeto não encontrado!" });
    }

    res.json({ message: "Projeto excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir projeto", error: err });
  }
};

module.exports = { createProject, getAllProjects, editProject, deleteProject };