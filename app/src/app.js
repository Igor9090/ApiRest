import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import imageRoutes from "./routes/imageRoutes";
import "./database";

const whiteList = [
  'https://apirest-qiek.onrender.com',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function(origin, callback){
    if( whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else {
      callback(new Error('Not allowed by Cors'))
    }
  }
}

class App {
  constructor() {
    this.app = express(corsOptions);
    this.middlaware();
    this.routes();
  }

  middlaware() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "..", "uploads", "images")));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/alunos/", alunoRoutes);
    this.app.use("/images/", imageRoutes);
  }
}

export default new App().app;
