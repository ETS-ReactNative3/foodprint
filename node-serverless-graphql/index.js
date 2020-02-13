const { ApolloServer } = require('apollo-server-cloud-functions');
const firebase = require('firebase/app');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const context = require('./context');

const firebaseConfig = {
  // ... download from firebase mate
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
