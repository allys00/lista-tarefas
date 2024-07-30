const { Sequelize } = require("sequelize");
// Sequelize e quem vai mediar nosso acesso ao banco de dados
// Ele que execulta as queries pra gente.

// Instanciando o Sequelize passando
// o tipo de Banco de dados que vamos utilizar
const sequelize = new Sequelize("sqlite::memory");

const testConnection = async () => {
  try {
    // Autentica o banco de dados
    await sequelize.authenticate();
    console.log("Connectado com banco de dados.");
  } catch (e) {
    console.log("ERROR", e);
  }
};

testConnection();

module.exports = sequelize;
