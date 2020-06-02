const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const studentType = require("../data_types/studentType");
const courseType = require("../data_types/courseType");
const gradeType = require("../data_types/gradeType");

const courses = require("../data/courses.json");
const grades = require("../data/grades.json");
const students = require("../data/students.json");

// Could just use "array.filter", but instead we use lodash.
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
        if (_.some(courses, { id: args.studentCourseId })) {
          const student = {
            id: students.length + 1,
            name: args.studentName,
            last_name: args.studentLastName,
            course_id: args.studentCourseId,
          };
          students.push(student);
          return student;
        }

        throw new Error(
          `${args.studentCourseId} is not a valid curse id. First create the course with that id.`
        );
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
        if (_.some(courses, { id: args.gradeCourseId })) {
          if (_.some(students, { id: args.gradeStudentId })) {
            let specificStudent = _.find(students, { id: args.gradeStudentId });

            if (specificStudent.course_id === args.gradeCourseId) {
              const grade = {
                id: grades.length + 1,
                course_id: args.gradeCourseId,
                student_id: args.gradeStudentId,
                grade: args.grade,
              };
              grades.push(grade);
              return grade;
            }

            throw new Error(
              `Student id:${args.gradeStudentId} is not signed to course id:${args.gradeCourseId}.`
            );
          }

          throw new Error(
            `${args.gradeStudentId} is not a valid student id. First create the student with that id.`
          );
        }

        throw new Error(
          `${args.gradeCourseId} is not a valid curse id. First create the course with that id.`
        );
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
        if (_.some(students, { course_id: args.course_id })) {
          throw new Error(
            `Course id:${args.course_id} has students signed, remove them first.`
          );
        } else if (_.some(grades, { course_id: args.course_id })) {
          throw new Error(
            `Course id:${args.course_id} has grades asociated, remove them first.`
          );
        } else {
          let removedCourses = _.remove(courses, (course) => {
            return course.id === args.course_id;
          });
          return removedCourses;
        }
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
        if (_.some(grades, { student_id: args.student_id })) {
          throw new Error(
            `Student id:${args.student_id} has grades asociated, remove them first.`
          );
        } else {
          let removedStudents = _.remove(students, (student) => {
            return student.id === args.student_id;
          });
          return removedStudents;
        }
      },
    },
  }),
});

module.exports = RootMutationType;
