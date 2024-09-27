module.exports = (sequelize, Sequelize) => {
  const Loja = sequelize.define(
    "loja",
    {
      nome: { type: Sequelize.STRING },
      endereco: { type: Sequelize.STRING },
      foto: { type: Sequelize.STRING },
    },

    {
      freezeTableName: true,
    }
  );
  return Loja;
};
