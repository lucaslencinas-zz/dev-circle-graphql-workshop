# Developer Circle - GraphQL Workshop

This workshop has 5 steps.
Each step is finished y saved on different branches so you can continue with this besides some issues that you may have during the coding.
So, let's begin!

## Pre-requisites

To start with this (GraphQL)[http://graphql.org/] workshop you will need to have [npm](https://nodejs.org/es/) and [node.js](https://nodejs.org/es/) 6 at least installed on you computer.
Also clone this repo:
```
git clone git@github.com:lucaslencinas/dev-circle-graphql-workshop.git
```

## Checkpoints

### First Checkpoint

Go to the branch `checkpoint-1` and install the dependencies.
```
cd dev-circle-graphql-workshop
git checkpoint checkpoint-1
npm install
```
This will generate a `node_modules` folder if the actions were finished correctly.

You have, among others, the files `package.json`, `server.js` and `schema.js`.
- `package.json`: describe the node app that you are running, with all the dependencies that uses. It has only one script `nodemon server.js`. [nodemon](https://nodemon.io/) monitors for any changes in your source and automatically restart your server. To run this script you only have to type `npm start` in your terminal.
- `server.js`: you have a simple express server with only a `ping` endpoint.
- `schema.js`: where all the GraphQL schemas will be defined as also the way that all the data will be retrieved.
- `data.json`: mocked data of players and ratings which we are going to use later.

#### Objectives

You have to create a GraphQL endpoint at `/graphql` with `graphiql` available that can respond to queries related to a particular football player sending an id.

In the server.js file, you have to tell express that in the endpoint `/graphql` use `expressGraphQL` function passing as parameter an schema and a `graphiql` attribute in `true`.

The schema passed over there, have to be defined somewhere, maybe in the `schema.js`. That schema have to be a GraphQLSchema with only a root query.
```
new GraphQLSchema({ query: RootQuery })
```
This RootQuery is a GraphQLObjectType object that will be in charge of resolving the incoming queries. For now, you have to create one GraphQLObjectType with:
- name: `RootQueryType`
- fields: this is an object where it's keys are type of queries that you can do to graphql. In this case we want a key for `player`.
This key `player` have to contain an object with 3 attributes: `type`, `args` and a `resolve` function.

- The `type` is another `GraphQLObjectType` that you will have to create.
- The `args` is an object where the keys are the attributes by which you can ask for a player in this case and each value is the type of that attribute.
- The `resolve(parentValue, args)` is a function that is called to gather and retrieved all the information needed for this `GraphQLObject`.

To sum up, you will need something like:

```javascript
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: {
        attributeUsedToFindThePlayer: { type: typeOfTheAttribute }
      },
      resolve(parentValue, args) {
        // this is where api calls, database queries or other actions happens to be able to gather the info to retrieve in this case a player
        // for now it's just an array.find() function over the array of hardcoded players in this same file.
        return { id: "123", name: "juan" }
      }
    }
  }
});
```

If all this things were done correctly you can start the node application going to the terminal and typing `npm start`.
Now that the server is up and running, go to the browser to `0.0.0.0:4000/graphql`. This will open the GraphiQL page where you can do the following query for example:
```
{
  player(id: "1") {
    id
    name
    age
  }
}
```


### Second Checkpoint

If you couldn't finish the first step, you can go to the branch `checkpoint-2`, and there you will have all the necessary things to start coding this step.
```
git checkpoint checkpoint-2
```

#### Objectives

Here we want to retrieve all the players, not just one by it's Id.
For this you will have to create another field key in the `RootQuery`.
This new field key will be `players` and will have only to attributes in it's value that you already know: `type` and `resolve()`.
Since you are retrieving a list of players you can type `new GraphQLList(SomeCustomTypeThatYouHaveToRetrieve)`.
The resolve function as you know have to retrieve all the mocked players.

If all this things were done correctly, go to the browser to `0.0.0.0:4000/graphql`. And in the GraphiQL page you can do the following query for example:
```
{
  players {
    id
    name
    age
  }
}
```


### Third Checkpoint

If you couldn't finish the second step, you can go to the branch `checkpoint-3`, and there you will have all the necessary things to start coding this step.
```
git checkpoint checkpoint-3
```

#### Objectives

Up to now, all the data is no the same file, so it's not really realistic. To go a litle bit closer to a real production environment we will setup a really small server where the data will be stored and when a query is made to GraphQL  we are going to do some http request to another to this server.
For that we are going to use:
- `axios`: a simple http client.
- `json-server`: an easy way to start a server where you can receive CRUD http calls.

Since all the schema will be the same, you don't have to change anything over there.
You only have change the way that the data is gathered and that happen in the `resolve` functions.
There you are going to do some call with `axios` similar to:
`axios.get('http://someURL:somePort/someEndpoint')`.
This will return a Promise with the response as a param, so after that do:
`.then((res) => res.data);`
and return that promise.

On the other part, to start a `json-server` server, you only have to have a json with data as it is the file `data.json` and an script in the `package.json` similar to:
`"json:server": "json-server data.json --watch"`.

This server use the port 3000 as default.
So now, you have to servers: one running Express with GraphQL and the other started with json-server. So you have to open two terminals. In one you do `npm start` and in the other `npm run json:server`.

If all this things were done correctly, go to the browser to `0.0.0.0:4000/graphql`. And in the GraphiQL page you can do same queries as before:
```
{
  players {
    id
    name
    age
  }
}
```


### Forth Checkpoint

If you couldn't finish the third step, you can go to the branch `checkpoint-4`, and there you will have all the necessary things to start coding this step
```
git checkpoint checkpoint-4
```

#### Objectives

We could do only queries to get data from GraphQL, so now we are going to do some changes in stored data by doing some `Mutations`.
`Mutations` are the way to change the data. Here is where you cand delete players, update players and create new players.
For that you have to add another attribute in the top schema where you added the `query: RootQuery`. That attribute will be `mutation: Mutation` where `Mutation` is a new `GraphQLObjectType` that you have to define.

This new `Mutation` `GraphQLObjectType` have the same structure as the `RootQuery` but fields are different.
Here we will define 3 fields: `addPlayer`, `deletePlayer` and `updatePlayer`. Each of these will have a type `PlayerType`, `args` and a `resolve` function.
We already know what are those for. Just a little thing: the `args` are the attributes by which you find a Player (an Id) and the attributes needed to update or create a new player. You may need the `GraphQLNonNull()` type to define the fields that are needed in each case.

If all this things were done correctly, go to the browser to `0.0.0.0:4000/graphql`. And in the GraphiQL page you can do queries like:

```
mutation {
  addPlayer(position: "ST", age: 24, name: "lucas") {
    id
    age
    position
    name
  }
}
```

### Fifth Checkpoint

If you couldn't finish the forth step, you can go to the branch `checkpoint-5`, and there you will have all the necessary things to start coding this step
```
git checkpoint checkpoint-5
```

#### Objectives

Last step, we are almost there.
What happen if all the data that we want in the client is not all together? What if there is part of the data in another place and we have to do several api calls to the services to get that information?
In this last step we are going to retrieve data from `players` and also data from their `ratings`.
Let's imagine that the players' data is in one place and the data for the ratings is in another place. So to merge those two things we will have to change a little bit the schema for the players.

The `PlayerType` now will have another field called `rating` with it's own type (`RatingType`) and it's own `resolve(parentValue, args)` function.
Let's leave the `resolve` function aside for a minute and focus on the `RatingType` which is quite simple.

Create a new `GraphQLObjectType` for that, with name `Rating` and fields `id` being a String, `value` being an Int and `numberOfRates` being also an Int.

The `resolve` function in the `PlayerType` Object, is going to retrieve the data for one player from the `json-server`.
How do you know which player? Well the `resolve(parentValue, args)` function has 2 parameters, the last one we have already used it. But no the first one. This is for the current already retrieved Object, in this case the `Player`.
Soooo, now that you have information about the current player, you know it's Id, so with this Id you can query the json-server asking for the ratings of this player doing something similar to:
```
axios.get('http://someURL:somePort/ratings/' + player.id)
```

So finally if all this things were done correctly, go to the browser to `0.0.0.0:4000/graphql`. And in the GraphiQL page you can do the following query for example:
```
{
  players {
    id
    name
    age
    rating {
      value
      numberOfRates
    }
  }
}
```

And that was a simple workshop about GraphQL with Node.js
If you have any feedback, problems, or anything that you want to say, please create an issue.
