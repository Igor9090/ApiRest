import dotenv from "dotenv";
import { join, resolve } from "path";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import delay from "express-delay";

import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import imageRoutes from "./routes/imageRoutes.js"
import database from "./database/index.js";

database.connection.authenticate()
  .then(() => console.log("✅ Conexão com PostgreSQL estabelecida com sucesso!"))
  .catch((error) => console.error("❌ Erro ao conectar com PostgreSQL:", error));

const whiteList = [
  "https://apirest-qiek.onrender.com",
  "https://consumirapi-37z4.onrender.com",
  "http://localhost:3000/",
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
  credentials: true
};

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(delay(500));

    this.app.use('/images', cors(corsOptions), express.static(resolve(__dirname, '..', 'app', 'uploads', 'images')));

    this.app.use(helmet());
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/alunos/", alunoRoutes);
    this.app.use("/api/images/", imageRoutes);
  }
}

export default new App().app;
