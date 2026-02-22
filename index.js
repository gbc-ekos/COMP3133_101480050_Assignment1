import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { ApolloServer }  from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import jwt from 'jsonwebtoken';
import typeDefs from './schemas/schema.js';
import resolvers from './resolvers/resolvers.js';

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({
  path: __dirname + "/.env",
});

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
}

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
    });

    await server.start();

    app.use(
      '/graphql', 
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const authHeader = req.headers.authorization || '';
          const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
          let user = null;
          if (token) {
            try {
              user = jwt.verify(token, process.env.JWT_SECRET);
            } catch (_) {}
          }
          return { req, user };
        }
      })
    );

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);
      try {
          connectDB()
          console.log('Connected to MongoDB Atlas');
      } catch (error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
    })
}

startServer();