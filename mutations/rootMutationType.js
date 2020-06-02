const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const studentType = require("../data_types/studentType");
const courseType = require("../data_types/courseType");
const gradeType = require("../data_types/gradeType");

const courses = require("../courses.json");
const grades = require("../grades.json");
const students = require("../students.json");

const _ = require("lodash");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    createCourse: {
      type: courseType,
      description: "Creates a new course",
      args: {
        courseName: { type: GraphQLNonNull(GraphQLString) },
        courseDescription: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const course = {
          id: courses.length + 1,
          name: args.courseName,
          description: args.courseDescription,
        };
        courses.push(course);
        return course;
      },
    },

    createStudent: {
      type: studentType,
      description: "Creates a new student",
      args: {
        studentName: { type: GraphQLNonNull(GraphQLString) },
        studentLastName: { type: GraphQLNonNull(GraphQLString) },
        studentCourseId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const student = {
          id: students.length + 1,
          name: args.studentName,
          last_name: args.studentLastName,
          course_id: args.studentCourseId,
        };
        students.push(student);
        return student;
      },
    },

    createGrade: {
      type: gradeType,
      description: "Creates a new grade",
      args: {
        gradeCourseId: { type: GraphQLNonNull(GraphQLInt) },
        gradeStudentId: { type: GraphQLNonNull(GraphQLInt) },
        grade: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const grade = {
          id: grades.length + 1,
          course_id: args.gradeCourseId,
          student_id: args.gradeStudentId,
          grade: args.grade,
        };
        grades.push(grade);
        return grade;
      },
    },

    /**
     * Type is GraphQLList(courseType) to avoid
     * message "Cannot return null for
     * non-nullable field" since lodash
     * _.remove returns array. Also, if there
     * are inconsistences with data base(courses.json
     * in this exercise), where there are more than one
     * course with the same course_id, this will
     * remove all of them.
     */
    deleteCourse: {
      type: new GraphQLList(courseType),
      description: "Delete a course by course_id",
      args: {
        course_id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        let removedCourses = _.remove(courses, (course) => {
          return course.id === args.course_id;
        });
        return removedCourses;
      },
    },

    deleteGrade: {
      type: new GraphQLList(gradeType),
      description: "Delete a grade by grade_id",
      args: {
        grade_id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        let removedGrades = _.remove(grades, (grade) => {
          return grade.id === args.grade_id;
        });
        return removedGrades;
      },
    },

    deleteStudent: {
      type: new GraphQLList(studentType),
      description: "Delete a student by student_id",
      args: {
        student_id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        let removedStudents = _.remove(students, (student) => {
          return student.id === args.student_id;
        });
        return removedStudents;
      },
    },
  }),
});

module.exports = RootMutationType;
