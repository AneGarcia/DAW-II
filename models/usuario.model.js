module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define(
    "usuario",
    {
      nome: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      senha: { type: Sequelize.STRING },
    },
    { freezeTableName: true }
  );
  return Usuario;
};
