const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } = require('graphql');
const TaskType = require('./types/TaskType'); // Importando o tipo Task
const taskResolvers = require('./resolvers/taskResolvers'); // Importando os resolvers de Task

// Definindo a Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve: taskResolvers.Query.task
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: taskResolvers.Query.tasks
    }
  }
});

// Definindo as Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
        projectId: { type: GraphQLString },
        userId: { type: GraphQLString }
      },
      resolve: taskResolvers.Mutation.createTask
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        finished: { type: GraphQLBoolean }
      },
      resolve: taskResolvers.Mutation.updateTask
    },
    deleteTask: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve: taskResolvers.Mutation.deleteTask
    }
  }
});

// Criando o schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;