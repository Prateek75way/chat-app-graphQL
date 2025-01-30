import express, { type Application, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import { ApolloServer } from 'apollo-server-express';

import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler"; // Ensure this path is correct
import typeDefs from "./app/graphql/schema"; // Ensure this path is correct
import resolvers from "./app/graphql/resolver"; // Ensure this path is correct
import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import cors from "cors";
loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser , "password"> {}
    interface Request {
      user?: User;
    }
  }
}

const port = Number(process.env.PORT) || 5000;

// Explicitly type the app as Application
const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const initApp = async (): Promise<void> => {
  try {
    await initDB();
    // initPassport();

    // Initialize Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' }); // Set the path for GraphQL

    app.use("/api", routes);

    app.get("/", (req: Request, res: Response) => {
      res.send({ status: "ok" });
    });

    app.use(errorHandler);

    http.createServer(app).listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error("Error initializing the application:", error);
    process.exit(1);
  }
};

// Call the initApp function to start the application
void initApp();