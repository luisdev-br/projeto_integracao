const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: GraphQLID },
    occupation: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    userId: { type: GraphQLID }
  }
});

module.exports = ProfileType;