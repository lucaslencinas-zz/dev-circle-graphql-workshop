const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const players = [
  {
    id: "1",
    name: "Lionel Messi",
    age: 28,
    position: "RW"
  },
  {
    id: "2",
    name: "Cristiano Ronaldo",
    age: 30,
    position: "LW"
  },
  {
    id: "3",
    name: "Neymar Junior",
    age: 26,
    position: "LW"
  },
  {
    id: "4",
    name: "Luis Suarez",
    age: 28,
    position: "ST"
  }
];


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
        return players.find((player) => player.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
