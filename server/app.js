const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mattmcguiness:password123@ds239930.mlab.com:39930/mattmcguiness-gql-books');
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});