module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define(
    "categoria",
    {
      nome: { type: Sequelize.STRING },
    },
    { freezeTableName: true }
  );
  return Categoria;
};
