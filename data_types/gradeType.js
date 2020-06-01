const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
  } = require("graphql");

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

  module.exports=gradeType;