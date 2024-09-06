module.exports = (app) => {
    const lojas = require("../controllers/loja.controllers");
    var router = require("express").Router();

    router.post("/",lojas.create);
    router.get("/", lojas.findAll);
    router.get("/:id", lojas.findOne);
    router.put("/:id", lojas.update);
    router.delete("/:id", lojas.delete);
    router.delete("/", lojas.deleteAll);


    app.use("/lojas", router);
}