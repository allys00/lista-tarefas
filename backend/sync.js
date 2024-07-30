const sequelize = require("./db");

const Tarefa = require("./Tarefa.model");

const syncDB = async () => {
  try {
    // Sincroniza o banco de dados.
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log("ERROR", error);
  }
};

syncDB();
