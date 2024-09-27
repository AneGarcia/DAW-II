module.exports = (sequelize, Sequelize) => {
  const Produto = sequelize.define(
    "produto",
    {
      nome: { type: Sequelize.STRING },
      preco: { type: Sequelize.FLOAT },
      descricao: { type: Sequelize.STRING },
      foto: { type: Sequelize.STRING },
    },
    //Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
    { freezeTableName: true }
  );
  return Produto;
};
