const { GraphQLObjectType, GraphQLList, GraphQLInt } = require("graphql");

const studentType = require("../data_types/studentType");
const courseType = require("../data_types/courseType");
const gradeType = require("../data_types/gradeType");

const courses = require("../data/courses.json");
const grades = require("../data/grades.json");
const students = require("../data/students.json");

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

    student: {
      type: studentType,
      description: "Student by student_id",
      args: {
        student_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        students.find((student) => student.id == args.student_id),
    },

    course: {
      type: courseType,
      description: "Course by course_id",
      args: {
        course_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        courses.find((course) => course.id === args.course_id),
    },

    grade: {
      type: gradeType,
      description: "Grade by grade_id",
      args: {
        grade_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        grades.find((grade) => grade.id === args.grade_id),
    },
  }),
});

module.exports = RootQueryType;
