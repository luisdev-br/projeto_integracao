const Project = require('../../models/Project');

const projectResolvers = {
  Query: {
    project: async (parent, { id }) => {
      return await Project.findById(id);
    },
    projects: async () => {
      return await Project.find();
    }
  },
  Mutation: {
    createProject: async (parent, { name, description, startDate, endDate }) => {
      const project = new Project({ name, description, startDate, endDate });
      return await project.save();
    },
    updateProject: async (parent, { id, name, description, startDate, endDate }) => {
      return await Project.findByIdAndUpdate(
        id,
        { name, description, startDate, endDate },
        { new: true }
      );
    },
    deleteProject: async (parent, { id }) => {
      return await Project.findByIdAndDelete(id);
    }
  }
};

module.exports = projectResolvers;