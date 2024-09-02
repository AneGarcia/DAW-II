const db = require("../models");
const Loja = db.lojas;
const Op = db.sequelize.Op;

exports.create = (req,res) => {
    const loja = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        foto: req.body.foto,
        usuarioId: req.body.usuarioId,
    };

    Loja.create(loja).then(data => res.send(data))
    .catch((err) => res.status(500).send({message: err.message || "Erro ao criar a loja."}));
}