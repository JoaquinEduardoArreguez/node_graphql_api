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

const courses = require("./courses.json");
const grades = require("./grades.json");
const students = require("./students.json");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    students: {
      type: new GraphQLList(studentType),
      description: "List of all students",
      resolve: () => students,
    },

    courses: {
      type: new GraphQLList(courseType),
      description: "List of all courses",
      resolve: () => courses,
    },

    grades: {
      type: new GraphQLList(gradeType),
      description: "List of all Grades",
      resolve: () => grades,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use("/graphql", expressGraphQl({ schema: schema, graphiql: true }));

app.listen(3000, () => {
  console.log("Server running");
});
