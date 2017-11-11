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

/* Example type
const SomeExampleType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: {type:GraphQLString},
    carName: {type:GraphQLString},
    numberOfChilds: {type:GraphQLInt},
    jobName: {type:GraphQLString}
  }
})
*/

/* Root Query
const RootQuery = new GraphQLObjectType({});
*/

// replace this nextline and export the actual GraphQLSchema
module.exports = {};
