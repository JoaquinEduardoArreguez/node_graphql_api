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

const courses = require("./courses.json");
const grades = require("./grades.json");
const students = require("./students.json");

const courseType = new GraphQLObjectType({
  name: "Course",
  description: "Represents a course",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const gradeType = new GraphQLObjectType({
  name: "Grade",
  description: "Represents a Grade",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    course_id: { type: GraphQLNonNull(GraphQLInt) },
    student_id: { type: GraphQLNonNull(GraphQLInt) },
    grade: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const studentType = new GraphQLObjectType({
    name: "Student",
    description:"Represents a student",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        last_name: {type: GraphQLNonNull(GraphQLString)},
        course_id: {type: GraphQLNonNull(GraphQLInt)},
    })
});

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description:"Root Query",
    fields: () => ({
        students:{
            type: new GraphQLList(studentType),
            description:"List of all students",
            resolve: ()=> students
        },

        courses:{
            type:new GraphQLList(courseType),
            description:"List of all courses",
            resolve:()=> courses
        },

        grades:{
            type:new GraphQLList(gradeType),
            description:"List of all Grades",
            resolve:()=> grades
        }





    }),
});

const schema = new GraphQLSchema({
    query:RootQueryType
});

app.use("/graphql", expressGraphQl({ schema: schema, graphiql: true }));

app.listen(3000, () => {
  console.log("Server running");
});
