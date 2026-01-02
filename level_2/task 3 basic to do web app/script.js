function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    const time = new Date().toLocaleString();

    li.innerHTML = `
        <strong>${taskText}</strong><br>
        <small>Added on: ${time}</small>
        <div class="task-buttons">
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    document.getElementById("pendingTasks").appendChild(li);
    taskInput.value = "";
}

function completeTask(button) {
    const task = button.parentElement.parentElement;
    const time = new Date().toLocaleString();

    task.innerHTML += `<br><small>Completed on: ${time}</small>`;
    button.remove();

    document.getElementById("completedTasks").appendChild(task);
}

function deleteTask(button) {
    const task = button.parentElement.parentElement;
    task.remove();
}

function editTask(button) {
    const task = button.parentElement.parentElement;
    const taskText = task.querySelector("strong");
    const newText = prompt("Edit task:", taskText.innerText);

    if (newText !== null && newText.trim() !== "") {
        taskText.innerText = newText;
    }
}
