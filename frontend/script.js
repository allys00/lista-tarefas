// Cria o endpoint para pegar as tarefas

const getTasks = async () => {
  try {
    // Usa o Fetch para ir no backend pegar as tarefas
    const tasks = await fetch("http://localhost:3000/tarefas").then(res => res.json())
    return tasks;
  } catch (error) {
    console.error(error)
  }
}

// Utiliza o metodo post para criar uma tarefa recebendo os dados pelo parametro
// E passando pelo body 
const createTask = async (body) => {
  try {
    const task = await fetch("http://localhost:3000/tarefas", {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    return task;

  } catch (error) {
    console.error(error)
  }
}


// Deleta a tarefa utilizando o metodo delete e passando o task no params
const deleteTask = async (taskId) => {
  try {
    await fetch(`http://localhost:3000/tarefas/${taskId}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error(error)
  }
}

// atualizar a tarefa utilizando o metodo patch e passando a task id no params
const updateTask = async (taskId, changes) => {
  try {
    await fetch(`http://localhost:3000/tarefas/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(changes),
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const populateTasksElements = async () => {
  // Consulta as tasks
  const tasks = await getTasks();
  const listElement = document.querySelector('#tasks-list')

  // Percorre todas as tarefas para popular nosso HTML
  for (let x = 0; x < tasks.length; x++) {

    // Cria nossos elementos e popula
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.checked = tasks[x].completo

    inputCheckbox.addEventListener('click', async () => {
      const novoValor = !tasks[x].completo
      await updateTask(tasks[x].id, { completo: novoValor });
      window.location.reload();
    })

    const titleP = document.createElement('p')
    titleP.textContent = tasks[x].titulo;

    const deleteButton = document.createElement('button');

    deleteButton.id = tasks[x].id;
    deleteButton.textContent = 'delete'

    // Cria o botao de deletar e adiciona o evento de click para chamr o endpoint
    // do delete.
    deleteButton.addEventListener('click', async () => {
      await deleteTask(deleteButton.id);
      window.location.reload();
    })

    const li = document.createElement('li');
    const div = document.createElement('div');

    div.className = 'task-div'
    div.appendChild(inputCheckbox)
    div.appendChild(titleP)

    li.className = 'task';
    li.appendChild(div)
    li.appendChild(deleteButton)
    listElement.appendChild(li)
  }

}

// Adiciona o evento de click para criar uma task
document
  .querySelector('#create-task-button')
  .addEventListener('click', async () => {
    const taskInputEl = document.querySelector('#task-input');
    if (!taskInputEl.value) {
      return alert('Preecha o Input com sua task')
    }

    // Pega o valor do input e envia para o endpoint createTask pelo parametro
    await createTask({ titulo: taskInputEl.value, nome_dono: "Andre", completo: false });
    taskInputEl.value = ''
    window.location.reload();
  })

populateTasksElements();