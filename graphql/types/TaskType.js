const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    finished: { type: GraphQLBoolean },
    projectId: { type: GraphQLID },
    userId: { type: GraphQLID }
  }
});

module.exports = TaskType;