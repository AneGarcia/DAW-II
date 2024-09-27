const db = require("../models");
const Categoria = db.categorias;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const categoria = {
    nome: req.body.nome,
  };

  Categoria.create(categoria)
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao criar a categoria" })
    );
};

exports.findAll = (req, res) => {
  Categoria.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao buscar categorias" })
    );
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Categoria.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Não possível encontrar uma categoria com o id" + id,
        });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao buscar por categoria" })
    );
};

exports.update = (req, res) => {
  const _id = req.params.id;
  Categoria.update(req.body, { where: { id: _id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Categoria atualizada com sucesso" });
      } else {
        res.status(404).send({
          message:
            "Não foi possível atualizar. Req.body vazio ou categoria não encontrada.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Categoria.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Categoria removida com sucesso" });
      } else {
        res.send({ message: "Categoria não encontrada. Id: " + id });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao deletar categoria" })
    );
};

exports.deleteAll = (req, res) => {
  Categoria.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} categorias foram removidas` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Erro ao remover categorias" });
    });
};
