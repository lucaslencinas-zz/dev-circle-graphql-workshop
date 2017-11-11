const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const axios = require('axios');

// Rating type
const RatingType = new GraphQLObjectType({
  name: 'Rating',
  fields: {
    id: {type:GraphQLString},
    value: {type:GraphQLInt},
    numberOfRates: {type:GraphQLInt}
  }
})

// Players type
const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    age: {type:GraphQLInt},
    position: {type:GraphQLString},
    rating: {
      type: RatingType,
      resolve(player, args) {
        return axios.get('http://localhost:3000/ratings/' + player.id)
          .then((res) => res.data);
      }
    }
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
    },
    ratings: {
      type: new GraphQLList(RatingType),
      resolve(parentValue, args) {
        return ratings;
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPlayer: {
      type: PlayerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        position: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue,args) {
        return axios.post('http://localhost:3000/players', {
          name: args.name,
          age: args.age,
          position: args.position
        })
        .then(res => res.data)
      }
    },
    deletePlayer: {
      type: PlayerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue,args) {
        return axios.delete('http://localhost:3000/players/' + args.id)
        .then(res => res.data)
      }
    },
    updatePlayer: {
      type: PlayerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type:GraphQLString},
        age: {type:GraphQLInt},
        position: {type:GraphQLString}
      },
      resolve(parentValue,args) {
        return axios.patch('http://localhost:3000/players/' + args.id)
        .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
