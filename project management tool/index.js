document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const clearTasksButton = document.getElementById('clear-tasks');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Event listener to add a task
    addTaskButton.addEventListener('click', addTask);

    // Event listener to clear all tasks
    clearTasksButton.addEventListener('click', clearTasks);

    // Event listener for task deletion and completion
    taskList.addEventListener('click', handleTaskClick);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);

            // Save the task to local storage
            saveTask(taskText);

            taskInput.value = '';
        }
    }

    function createTaskItem(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('delete-button')) {
            const taskItem = e.target.parentElement;
            removeTask(taskItem);
        } else {
            // Handle task completion here (e.g., strikethrough text)
            e.target.classList.toggle('completed');
        }
    }

    function removeTask(taskItem) {
        taskList.removeChild(taskItem);
        // Remove the task from local storage
        removeTaskFromStorage(taskItem.textContent);
    }

    function clearTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        // Clear all tasks from local storage
        localStorage.clear();
    }

    function saveTask(taskText) {
        let tasks = getTasksFromStorage();
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = getTasksFromStorage();
        tasks.forEach((taskText) => {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
        });
    }

    function getTasksFromStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks;
    }

    function removeTaskFromStorage(taskText) {
        let tasks = getTasksFromStorage();
        tasks = tasks.filter((task) => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
