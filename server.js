const express = require('express');
// const expressGraphQL = require('express-graphql');
// const schema = require('./schema.js');

const app = express();

app.use('/ping', (req, res) => {
  res.send({ status: 200 });
});

// Change the next line so you can pass the correct params to expressGraphQL
// app.use('/graphql', expressGraphQL())

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
