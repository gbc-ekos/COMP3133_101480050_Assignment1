import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { ApolloServer }  from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import typeDefs from './schemas/schema.js';
import resolvers from './resolvers/resolvers.js';

const app = express();
dotenv.config();

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
}

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();

    app.use(
      '/graphql', 
      cors(),
      express.json(),
      expressMiddleware(server)
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