const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require("graphql");

const studentType = new GraphQLObjectType({
  name: "Student",
  description: "Represents a student",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    course_id: { type: GraphQLNonNull(GraphQLInt) },
    
  }),
});

module.exports=studentType;