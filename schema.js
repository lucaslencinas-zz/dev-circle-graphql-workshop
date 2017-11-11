const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const axios = require('axios');

// Players type
const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    age: {type:GraphQLInt},
    position: {type:GraphQLString}
  }
})


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/players/' + args.id)
          .then((res) => res.data);
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/players')
          .then((res) => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
