// config inicial
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");


//forma de ler JSON
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

//rota api
const personRouters = require("./routes/personRoutes");
app.use("/person", personRouters);

const endRouters = require("./routes/endRouters");
app.use("/end", endRouters);


const DB_USER = process.env.DB_USER ;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
//conexao com banco
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yh9xs.mongodb.net/nodedb?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao banco");
    app.listen(port);
  })
  .catch((error) => console.log(error));
