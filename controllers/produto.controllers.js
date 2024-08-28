const db = require("../models");
const Produto = db.produtos;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    //validações
    if (!req.body.nome){
        res.status(400).send({
            message: "Conteúdo não pode estar vazio",
        });
        return;
    }
    //objeto com dados p salvar no banco
    const produto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        foto: req.body.foto,
        lojaId: req.body.lojaId,
    };

    Produto.create(produto)
    .then((data) => res.send(data))
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao criar produto",
        });
    });
};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {nome: { [Op.iLike]: '%${nome}%'} } : null;

    Produto.findAll({where: condition})
    .then((data) => res.send(data))
    .catch((err) =>
        res
            .status(500)
            .send({message: err.message || "Erro ao buscar por produtos" })
    );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Produto.findByPk(id)
    .then((data) => {
        if (data) {
            res.send(data);
        }else{
            res
                .status(404)
                .send({message: 'Não foi possível encontrar produto com id ${id}'});
        }
    })
    .catch((err) => 
        res.status(500).send({
            message: err.message || 'Erro ao buscar por produto com id ${id}',
        })
    );
};