const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');
const api = require('./api');

const FoodType = new GraphQLObjectType({
  name: 'Food',
  description: '...',

  fields: () => ({
    recipe: {
      type: GraphQLString,
      resolve: (data = '') => data
    }
  })
});

const BeerType = new GraphQLObjectType({
  name: 'Beer',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (data = {}) => data.name
    },
    food: {
      type: GraphQLList(FoodType),
      resolve: (data = {}) => data.food_pairing
    },
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      beer: {
        type: BeerType,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve: async (root, args) => {
          const { data = [] } = await api.get(`/${args.id}`);
          return data[0];
        }
      }
    })
  })
});