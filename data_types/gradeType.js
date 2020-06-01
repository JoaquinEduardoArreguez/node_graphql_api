const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require("graphql");

const courseType = require("./courseType");
const studentType = require("./studentType");

const courses = require("../courses.json");
const students = require("../students.json");

const gradeType = new GraphQLObjectType({
  name: "Grade",
  description: "Represents a Grade",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    course_id: { type: GraphQLNonNull(GraphQLInt) },
    student_id: { type: GraphQLNonNull(GraphQLInt) },
    grade: { type: GraphQLNonNull(GraphQLInt) },
    course: {
      type: courseType,
      resolve: (grade) => {
        return courses.find((course) => course.id === grade.course_id);
      },
    },
    student: {
        type: studentType,
        resolve: (grade) => {
            return students.find( student => student.id === grade.student_id );
        }
    }
  }),
});

module.exports = gradeType;
