{
    let tasks = [];
    focusInput = function getFocus() {
        document.getElementById("focusField").focus();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { taskName: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        const task = tasks[taskIndex];
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...task, done: !task.done, },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-taskRemove");

        removeButtons.forEach((removeButton, removeIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(removeIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-taskDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
        focusInput();
    };

    const render = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
            <li class="taskList__item">
                <button class="taskList__button js-taskDone">${task.done ? "&#10004;" : ""}</button>
                <span${task.done ? " class=\"list__taskName--done\"" : ""}>${task.taskName}</span>
                <button class="taskList__button taskList__button--delete js-taskRemove">&#128465;</button>
            </li>
            `;
        }
        document.querySelector(".js-task").innerHTML = tasksListHTMLContent;

        bindEvents();

    };

    const resetFormInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            resetFormInput(newTask);
            return;
        }
        addNewTask(newTaskContent);
        resetFormInput(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}