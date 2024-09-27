const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "daw_ii_secret_key";

exports.create = (req, res) => {
  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 10),
  };

  Usuario.create(usuario)
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao criar a usuario" })
    );
};

exports.login = (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }
      var passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha inválida!",
        });
      }
      var token = jwt.sign({ id: usuario.id }, secretKey, { expiresIn: "1h" });
      res.status(200).send({ usuario: usuario, accessToken: token });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Usuario.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao buscar usuarios" })
    );
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Usuario.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Não possível encontrar uma usuario com o id" + id,
        });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao buscar por usuario" })
    );
};

exports.update = (req, res) => {
  const _id = req.params.id;
  Usuario.update(req.body, { where: { id: _id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Usuario atualizada com sucesso" });
      } else {
        res.status(404).send({
          message:
            "Não foi possível atualizar. Req.body vazio ou usuario não encontrada.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Usuario removida com sucesso" });
      } else {
        res.send({ message: "Usuario não encontrada. Id: " + id });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Erro ao deletar usuario" })
    );
};

exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} usuarios foram removidas` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Erro ao remover usuarios" });
    });
};
