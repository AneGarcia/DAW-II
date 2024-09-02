module.exports = (app) => {
    const lojas = require("../controllers/loja.controllers");
    var router = require("express").Router();

    router.post("/",lojas.create);

    app.use("/lojas", router);
}