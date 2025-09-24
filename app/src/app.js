import dotenv from "dotenv";
import { join } from "path";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import delay from "express-delay";

import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import database from "./database/index.js";

database.connection.authenticate()
  .then(() => console.log("✅ Conexão com PostgreSQL estabelecida com sucesso!"))
  .catch((error) => console.error("❌ Erro ao conectar com PostgreSQL:", error));

const whiteList = [
  "http://localhost:3000",
  "https://apirest-qiek.onrender.com",
  undefined,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(delay(500));


    const staticPath = join(process.cwd(), "app", "uploads", "images");
    this.app.use("/images", express.static(staticPath));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/alunos/", alunoRoutes);

  }
}

export default new App().app;
