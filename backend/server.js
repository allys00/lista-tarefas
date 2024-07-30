const express = require("express");
const Tarefa = require("./Tarefa.model");
const sequelize = require("./db");
const cors = require('cors')

const corsOptions = {
  origin: "*",
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions))

//Endpoint
// BaseURL + Porta + Path
// locahost:3000/tarefas

// Consultar todas as minhas tarefas atraves do endpoint
app.get("/tarefas", async (request, response) => {
  // Apos o endpoint ser chamado execulte esse codigo
  // Responde a requisição utilisando o response.
  try {
    // Consulta todas as tarefas existentes
    const tarefas = await Tarefa.findAll();
    // Responde a requisição e retorna as tarefas
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Criar Tarefa
app.post("/tarefas", async (request, response) => {
  try {
    // O Create  cria uma nova tarefa
    //  utilizando o Body que vem da request
    // O Body ele geralmente vem do Front-end
    const tarefa = await Tarefa.create(request.body);
    // Retorna A tarefa apos criar.
    response.status(201).json(tarefa);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Delete Tarefa recebendo o ID pelo PARAMS
app.delete("/tarefas/:tarefaId", async (request, response) => {
  try {
    // Achar Tarefa pelo ID para depois Destruir
    const tarefa = await Tarefa.findOne({ where: { id: request.params.tarefaId } })
    tarefa.destroy();
    response.status(204).send()
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


app.patch("/tarefas/:tarefaId", async (request, response) => {
  try {
    const tarefa = await Tarefa.findOne({ where: { id: request.params.tarefaId } })
    tarefa.update(request.body);
    tarefa.save()
    response.status(200).json(tarefa)
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
})
// Porta da base URL
const port = 3000;
// Sincronizar o Banco de dados DB = Database = Banco de dados.
sequelize.sync().then(() => {
  // Rodar o servidor para ficar escutando as chamadas ao endpoint
  app.listen(port, () => {
    console.log("Servidor Rodando na url http://localhost:" + port);
  });
});
