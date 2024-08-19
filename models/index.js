const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    config
);

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;
db.produtos = require("./produto.model.js")(sequelize, Sequelize);

module.exports = db;