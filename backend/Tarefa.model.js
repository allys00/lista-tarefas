const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// Cria uma tabela no banco de dados com nome Tarefa
const Tarefa = sequelize.define("Tarefas", {
  // Define os atributos desse modelo/objeto
  titulo: {
    // String = Texto
    // Define o tipo do atributo
    type: DataTypes.STRING,
    // Define se ele e opcional ou nao
    allowNull: false,
  },
  nome_dono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completo: {
    // Bollean = True Ou False = Verdadeiro ou falso
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
});

// Exportar Modelo
module.exports = Tarefa;
