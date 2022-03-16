const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const DbConnection = require ('../secrets')

mongoose.connect(DbConnection)
mongoose.connection.once('open', () => {
    console.log('connected to database')
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('now listening on port 4000')
})