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
    var condition = nome ? {nome: { [Op.iLike]: `%${nome}%`} } : null;

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

    Produto.findByPk(id, {include: ["loja"]})
    .then((data) => {
        if (data) {
            res.send(data);
        }else{
            res.status(404).send({
                message: `Não foi possível encontrar produto com id ${id}`,
            });
        }
    })
    .catch((err) => 
        res.status(500).send({
            message: err.message || `Erro ao buscar por produto com id ${id}`,
        })
    );
};

exports.update = (req,res) => {
    const id = req.params.id;

    Produto.update(req.body, {
        where: {id: id},
    })
    .then((num) => {
        if (num == 1) {
            res.send({
                message: "Produto foi atualizado com sucesso.",
            });
        }else{
            res.send({
                message: `Não foi possível atualizar Produto com id= ${id}. Talvez o produto não tenha sido encontrado ou req.body está vazio`,
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro em atualizar o Produto via id=" + id,
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Produto.destroy({
        where: {id: id},
    })
    .then((num) => {
        if (num == 1){
            res.send({
                message: "Produto foi deletado com sucesso!",
            });
        }
        else{
            res.send({
                message: "Não é possível deletar esse Produto. Ele não foi encontrado"
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Não é possível deletar Produto com id=" + id,
        });
    });
};

exports.deleteAll = (req, res) => {
    Produto.destroy({
        where: {},
        truncate: false,
    })
    .then((nums) =>{
        res.send({message: `${nums} Produtos foram deletados com sucesso!`});
    })
    .cacth((err) =>{
        res.status(500).send({
            message: err.message || "Erro enquanto deletava os produtos.",
        });
    });
};