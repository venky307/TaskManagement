async function updateTask(id) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    if (!title || !description || !dueDate) {
        alert('All fields are required!');
        return;
    }

    const task = { title, description, dueDate };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedTask = await response.json();
        updateTaskToDOM(updatedTask);
        clearForm();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

function redirectToUpdate(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(task => {
            // Redirect to Update.html with task details as query parameters
            const queryString = `?id=${task.id}&title=${encodeURIComponent(task.title)}&description=${encodeURIComponent(task.description)}&dueDate=${task.dueDate}`;
            window.location.href = `Update.html${queryString}`;
        })
        .catch(error => {
            console.error('Error fetching task details:', error);
        });
}


function updateTaskToDOM(updatedTask) {
    const taskId = updatedTask.id;
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.innerHTML = `
            <h3>${updatedTask.title}</h3>
            <p>${updatedTask.description}</p>
            <p>Due: ${updatedTask.dueDate}</p>
            <button onclick="redirectToUpdate(${updatedTask.id})">Update</button>
            <button onclick="deleteTask(${updatedTask.id})">Delete</button>
        `;
    }
}

function prefillTaskDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');
    const title = urlParams.get('title');
    const description = urlParams.get('description');
    const dueDate = urlParams.get('dueDate');

    if (taskId && title && description && dueDate) {
        document.getElementById('taskId').value = taskId;
        document.getElementById('title').value = decodeURIComponent(title);
        document.getElementById('description').value = decodeURIComponent(description);
        document.getElementById('dueDate').value = dueDate;
    } else {
        console.error('Missing task details in query parameters');
    }
}

document.addEventListener('DOMContentLoaded', prefillTaskDetails);
