module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define("produto",{
        nome: {type: Sequelize.STRING},
        preco: {type: Sequelize.FLOAT},
        descricao: {type: Sequelize.STRING},
        foto: {type: Sequelize.STRING},
    },

    {freezeTableName: true}
    );
    return Produto;
};