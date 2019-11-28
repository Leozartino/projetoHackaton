import { Router } from "express";

const routes = new Router();

const users = [
  {
    id: 0,
    nome: "Leonardo Oliveira",
    cidade: "Santana",
    data_nasc: "15/10/1996"
  }
];

let id = 1;

// Middlewares -< validações basicas
function checkValues(req, res, next) {
  if (!(req.body.name || req.body.cidade || req.body.data_nasc)) {
    return res
      .status(400)
      .json({ error: "Por favor, informe os campos a serem preenchidos" });
  } else {
    return next();
  }
}

function checkId(req, res, next) {
  if (!users.find(user => user.id == req.params.id)) {
    return res.status(400).json({ error: "Pessoa não encontrada" });
  }
  return next();
}

// Rotas
routes.get("/pessoas", (req, res) => {
  res.json(users);
});

routes.post("/pessoas", checkValues, (req, res) => {
  const { nome, cidade, data_nasc } = req.body;
  users.push({ id, nome, cidade, data_nasc });
  id += 1;
  return res.send("Usuário cadastrado com sucesso!");
});

routes.patch("/pessoas/:id", checkId, checkValues, (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const { nome, cidade, data_nasc } = req.body;
  const indexUser = users.findIndex(user => user.id == req.params.id);
  users[indexUser] = { id, nome, cidade, data_nasc };

  return res.send(`Usuário de id ${id} foi alterado com sucesso!`);
});

routes.delete("/pessoas/:id", checkId, (req, res) => {
  let { id } = req.params;

  users.splice(id, 1);
  id -= 1;
  return res.json({ msg: "sucesso" });
});

export default routes;
