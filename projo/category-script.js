document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const categoryTitle = document.getElementById('category-title');

    const categories = ['personal', 'work', 'shopping', 'coding', 'health', 'education', 'fitness', 'finance', 'festival'];
    const category = localStorage.getItem('currentCategory');
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    const tasks = JSON.parse(localStorage.getItem(category)) || [];

    function updateLocalStorage() {
        localStorage.setItem(category, JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            span.addEventListener('click', () => toggleComplete(index));
            span.style.cursor = 'pointer';
            span.style.flex = '1';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => editTask(index));
            styleButton(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            styleButton(deleteBtn);

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.padding = '10px';
            li.style.borderBottom = '1px solid #ccc';
            taskList.appendChild(li);
        });
    }

    function styleButton(button) {
        button.style.padding = '5px 10px';
        button.style.marginLeft = '10px';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#6200ea';
        button.style.color = 'white';
    }

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            updateLocalStorage();
            renderTasks();
            newTaskInput.value = '';
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    }

    function editTask(index) {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            tasks[index].text = newTaskText;
            updateLocalStorage();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();

    window.goBack = function() {
        window.history.back();
    };
});


