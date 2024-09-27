module.exports = (app) => {
  const usuarios = require("../controllers/usuario.controller");
  var router = require("express").Router();

  router.post("/login", usuarios.login);
  router.post("/", usuarios.create);
  router.get("/", usuarios.findAll);
  router.get("/:id", usuarios.findOne);
  router.put("/:id", usuarios.update);
  router.delete("/:id", usuarios.delete);
  router.delete("/", usuarios.deleteAll);

  app.use("/usuarios", router);
};
