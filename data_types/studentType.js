const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require("graphql");

const courseType = require("./courseType");
const courses = require("../courses.json");

const studentType = new GraphQLObjectType({
  name: "Student",
  description: "Represents a student",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    course_id: { type: GraphQLNonNull(GraphQLInt) },
    course: {
      type: courseType,
      resolve: (student) => {
        return courses.find((course) => course.id === student.course_id);
      },
    },
  }),
});

module.exports = studentType;
