const express = require("express");
const app = express();
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const RootQueryType = require("./queries/rootQueryType");
const RootMutationType = require("./mutations/rootMutationType");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use("/graphql", expressGraphQl({ schema: schema, graphiql: true }));

app.listen(3000, () => {
  console.log("Server running");
});
