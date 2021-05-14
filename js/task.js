{
    const tasks = [
        {
            taskName: "Pouczyć się kodu JavaScript",
            done: true,
        },
        {
            taskName: "Zrobić zadanie domowe z kursu YouCode.pl",
            done: false,
        },
    ];
    focusMethod = function getFocus() {
        document.getElementById("focusField").focus();
      }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            taskName: newTaskContent,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
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
        focusMethod();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <div class="taskList__list js-task">
            <div class="listItem">
            <div class="listItem__taskButton"><button class="listItem__Button listItem__Button--check js-taskDone">${task.done ? "&#10004;" : ""}</button>
            </div>
            <div class="listItem__taskName">
            <p${task.done ? " class=\"listItem__taskDone\"" : ""}>${task.taskName}</p>
            </div>
            <div class="listItem__taskButton">
                <button class="listItem__Button listItem__Button--delete js-taskRemove">&#128465;</button>
            </div>
            </div>
            </div>
            `;
        }
        document.querySelector(".js-task").innerHTML = htmlString;

        bindEvents();

    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}