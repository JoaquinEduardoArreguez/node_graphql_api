const express = require("express");
const app = express();
const expressGraphQl = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const studentType = require("./data_types/studentType");
const courseType = require("./data_types/courseType");
const gradeType = require("./data_types/gradeType");

const courses = require("./data/courses.json");
const grades = require("./data/grades.json");
const students = require("./data/students.json");

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
