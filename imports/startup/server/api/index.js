import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";
import merge from "lodash/merge";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

import VenueSchema from "../../../api/venues/Venue.graphql";
import VenueResolvers from "../../../api/venues/resolvers";

import ResultSchema from "../../../api/results/Result.graphql";
import ResultResolvers from "../../../api/results/resolvers";

const typeDefs = [UserSchema, VenueSchema, ResultSchema];
const resolvers = merge(UserResolvers, VenueResolvers, ResultResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: "/graphql"
});

WebApp.connectHandlers.use("/graphql", (req, res) => {
  if (req.method === "GET") {
    res.end();
  }
});
