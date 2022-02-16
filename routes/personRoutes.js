const router = require("express").Router();
const Person = require("../models/Person");

//rota inicial / endPoint

//rota da API
router.post("/", (req, res) => {
  const { name, salary, approved } = req.body;
  if (!name || !salary || !approved) {
    res.status(500).json("Erro ao cadastrar");
  } else {
    const person = {
      name,
      salary,
      approved,
    };

    try {
      Person.create(person);
      res.status(201).json("Inserido com sucesso");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
});

//Read de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Busca por ID

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findById({ _id: id });
  if (!person) {
    try {
      res.status(422).json({ message: "Usuario não encontrado" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(200).json(person);
  }
});

// update
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };
  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);
    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "Usuario não encontrado" });
    } else res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
    res.status(500).json("Erro ao cadastrar");
  }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const person = await Person.findById({ _id: id });
    if (!person) {
        res.status(422).json({ message: "Usuario não encontrado" });
      }else{
          try {
              await Person.deleteOne({_id : id})
              res.status(200).json({ message: "Usuario removido" });
              
          } catch (error) {
            
                res.status(500).json({ error: error });
                
          }
      }
});






module.exports = router;
