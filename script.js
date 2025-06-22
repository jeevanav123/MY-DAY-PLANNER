let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const label = document.createElement("span");
    label.textContent = task.time ? `${task.text} at ${task.time}` : task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const timeInput = document.getElementById("timeInput");
  const text = input.value.trim();
  const time = timeInput.value;

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text: text, time: time, completed: false });
  input.value = "";
  timeInput.value = "";
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function updateCounter() {
  const count = tasks.filter(task => !task.completed).length;
  document.getElementById("taskCounter").textContent = `${count} task${count !== 1 ? "s" : ""} left`;
}

// Initial render
renderTasks();
