const prompt = require('prompt-sync')({ sigint: true });

let todos = [];

// Fungsi untuk membuat ID unik
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomNum}`;
}

function addTodo() {
  let toDoText = prompt('Masukan To Do: ');

  if (!toDoText || !toDoText.trim()) {
    console.log('To Do Tidak Boleh Kosong');
    return;
  }

  let newToDo = {
    id: generateUniqueId(),
    text: toDoText.trim(),
    isCompleted: false,
  };

  todos.push(newToDo);
  console.log('To Do berhasil ditambahkan:', newToDo.text);
}

function listTodos() {
  console.log('\n--- YOUR TO-DO LIST ---');

  if (todos.length === 0) {
    console.log('No to-dos to display.\n');
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? '[DONE]' : '[ACTIVE]';
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });

  console.log('------------------------\n');
}

function markTodoCompleted() {
  listTodos();
  if (todos.length === 0) return;

  let index = parseInt(
    prompt('Masukkan nomor To-Do yang ingin ditandai selesai: ')
  );

  if (isNaN(index) || index < 1 || index > todos.length) {
    console.log('Nomor tidak valid.');
    return;
  }

  let todo = todos[index - 1];
  if (todo.isCompleted) {
    console.log('To-Do ini sudah selesai sebelumnya.');
  } else {
    todo.isCompleted = true;
    console.log(`To-Do "${todo.text}" berhasil ditandai selesai.`);
  }
}

function deleteTodo() {
  listTodos();
  if (todos.length === 0) return;

  let index = parseInt(prompt('Masukkan nomor To-Do yang ingin dihapus: '));

  if (isNaN(index) || index < 1 || index > todos.length) {
    console.log('Nomor tidak valid.');
    return;
  }

  let removed = todos.splice(index - 1, 1);
  console.log(`To-Do "${removed[0].text}" berhasil dihapus.`);
}

function runTodoApp() {
  let running = true;

  while (running) {
    console.log(`
=========================
Available Commands:
1. Add       - Add a new to-do
2. Complete  - Mark a to-do as completed
3. Delete    - Delete a to-do
4. List      - Show all to-dos
5. Exit      - Exit the Application
=========================
    `);

    let command = prompt('Enter a command (1-5): ').trim();

    switch (command) {
      case '1':
        addTodo();
        break;
      case '2':
        markTodoCompleted();
        break;
      case '3':
        deleteTodo();
        break;
      case '4':
        listTodos();
        break;
      case '5':
        console.log('Thank You for Using the Application');
        running = false;
        break;
      default:
        console.log('Masukan Input dengan Benar (1-5)');
    }
  }
}

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
