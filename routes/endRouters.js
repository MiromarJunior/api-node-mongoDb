const router = require("express").Router();
const End = require("../models/End");


  
  //rota inicial / endPoint
  
  //rota da API
 
  
  router.post("/", (req, res) => {
    const { rua, cidade, cep } = req.body;
    if (!rua || !cidade || !cep) {
      res.status(500).json("Erro ao cadastrar");
    } else {
      const end = {
        rua,
        cidade,
        cep,
      };
  
      try {
        End.create(end);
        res.status(201).json("Endereco Inserido com sucesso");
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  });
  
  module.exports = router;