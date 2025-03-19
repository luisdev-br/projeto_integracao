const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLDate } = require('graphql');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    startDate: { type: GraphQLString }, // GraphQL não tem um tipo Date nativo
    endDate: { type: GraphQLString }
  }
});

module.exports = ProjectType;