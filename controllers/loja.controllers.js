const { where } = require("sequelize");
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

exports.findAll = (req, res) => {
    Loja.findAll().then(data => res.send(data))
    .catch(err => res.status(500).send({message: err.message || "Erro ao buscar lojas"}));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Loja.findByPk(id).then(data =>{
        if(data){
            res.send(data);
        }
        else{
            res.status(404).send({message: "Não foi possível encontrar uma loja com o id" + id});
        }
    }).catch(err => res
        .status(500)
        .send({message:err.message || "Erro ao buscar por loja"})
    );
};

exports.update = (req, res) => {
    const id = req.params.id;

    Loja.update(req.body, {where: {id: id}})
    .then((num) => {
        if(num = 1){
            req.send({message: "Loja atualizada com sucesso"});
        }else{
            res.status(404)
            .send({message: "Não foi possível atualizar. req.body vazio ou loja não encontrada."});
        }
    })
    .catch((err) => {
        res.status(500)
        .send({message: err.message || "Erro ao atualizar loja"});
    });
};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Loja.destroy({where: {id: id}}).then((num) => {
        if(num = 1){
            res.send({message: "Loja remocida com sucesso"});
        }else{
            res.send({message: "Loja não encontrada. Id: " + id});
        }
    })
    .catch((err) =>
        res.status(500)
        .send({message: err.message || "Erro ao deletar loja"})
    );
};

exports.deleteAll = (req,res) => {
    Loja.destroy({
        where: {},
        truncate: false,
    }).then((nums) => {
        res.send({message: `${nums} lojas deletadas`});
    })
    .catch((err) => {
        res.status(500).send({message: err.message || "Erro ao remover loja"});
    });
};