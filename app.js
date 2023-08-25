const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="completeBtn">Complete</button>
        <button class="removeBtn">Remove</button>
    `;
    taskList.appendChild(taskItem);

    taskInput.value = "";

    const completeBtn = taskItem.querySelector(".completeBtn");
    const removeBtn = taskItem.querySelector(".removeBtn");

    completeBtn.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks(); 
    });

    removeBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        saveTasks(); 
    });

    saveTasks(); 
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(taskItem => {
        const taskText = taskItem.querySelector("span").textContent;
        const isCompleted = taskItem.classList.contains("completed");
        return { text: taskText, completed: isCompleted };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="completeBtn">Complete</button>
                <button class="removeBtn">Remove</button>
            `;
            if (task.completed) {
                taskItem.classList.add("completed");
            }
            taskList.appendChild(taskItem);

            const completeBtn = taskItem.querySelector(".completeBtn");
            const removeBtn = taskItem.querySelector(".removeBtn");

            completeBtn.addEventListener("click", () => {
                taskItem.classList.toggle("completed");
                saveTasks();
            });

            removeBtn.addEventListener("click", () => {
                taskList.removeChild(taskItem);
                saveTasks();
            });
        });
    }
}
