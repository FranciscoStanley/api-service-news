import dotenv from "dotenv";
import express, { json } from "express";
import connectiondb from "./src/database/database.js";

import useRouter from "./src/routers/user.router.js";
import authRouter from "./src/routers/auth.router.js";
import newsRouter from "./src/routers/news.router.js";

dotenv.config();

const app = express();

//Configurações da porta do servidor
const port = process.env.PORT;

//Chamando connfigurações de conexão com banco
connectiondb();

//Middlewares
app.use(json());
app.use("/user", useRouter);
app.use("/auth", authRouter);
app.use("/news", newsRouter);

//Listando a porta que o servidor está rodando
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
