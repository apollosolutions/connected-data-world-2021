const { resolve } = require("path");
const { readFileSync } = require("fs");
const { gql, ApolloServer } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation");

const mocks = require("./mocks.js");
const resolvers = require("./resolvers.js");
const typeDefs = gql(
  readFileSync(resolve(__dirname, "..", "schema.graphql"), { encoding: "utf8" })
);
const schema = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema, mocks });

const port = process.env.PORT || 4000;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Ready at ${url}`);
});
