import dotenv from "dotenv";
import { join, resolve } from "path"; // ⬅️ ADICIONE RESOLVE AQUI
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
  "http://localhost:3000",
  "https://apirest-qiek.onrender.com",
  "http://localhost:3001", // ⬅️ ADICIONE SEU FRONTEND
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

    // ⬇️ CORRIGIDO - Agora resolve está importado
    this.app.use('/images', express.static(resolve(__dirname, '..', 'app', 'uploads', 'images')));
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
