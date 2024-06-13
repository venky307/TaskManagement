const apiUrl = 'http://localhost:8080/api/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    displayTasks(tasks);
}

async function createTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    
    if (!title || !description || !dueDate) {
        alert('All fields are required!');
        return;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, dueDate }),
    });

    const newTask = await response.json();
    addTaskToDOM(newTask);
}


async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    document.getElementById(`task-${id}`).remove();
}



function displayTasks(tasks) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
    const tasksContainer = document.getElementById('tasks');
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.id = `task-${task.id}`;
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due: ${task.dueDate}</p>
        <button onclick="redirectToUpdate(${task.id})">Update</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    tasksContainer.appendChild(taskElement);
}

document.addEventListener('DOMContentLoaded', fetchTasks);
