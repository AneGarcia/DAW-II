const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config
);
const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.produtos = require("./produto.model.js")(sequelize, Sequelize);
db.lojas = require("./loja.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.categorias = require("./categoria.model.js")(sequelize, Sequelize);

//Relacionamento 1:1 entre Usuario e Loja
db.usuarios.hasOne(db.lojas);
db.lojas.belongsTo(db.usuarios);

//Relacionamento 1:* entre Loja e Produto
db.lojas.hasMany(db.produtos);
db.produtos.belongsTo(db.lojas);

//Relacionamento *:* entre Produto e Categoria
db.produtos.belongsToMany(db.categorias, { through: "produtoCategoria" });
db.categorias.belongsToMany(db.produtos, { through: "produtoCategoria" });

module.exports = db;
