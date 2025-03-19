const Task = require('../../models/Task');

const taskResolvers = {
  Query: {
    task: async (parent, { id }) => {
      return await Task.findById(id);
    },
    tasks: async () => {
      return await Task.find();
    }
  },
  Mutation: {
    createTask: async (parent, { title, projectId, userId }) => {
      const task = new Task({ title, projectId, userId, finished: false });
      return await task.save();
    },
    updateTask: async (parent, { id, title, finished }) => {
      return await Task.findByIdAndUpdate(
        id,
        { title, finished },
        { new: true }
      );
    },
    deleteTask: async (parent, { id }) => {
      return await Task.findByIdAndDelete(id);
    }
  }
};

module.exports = taskResolvers;