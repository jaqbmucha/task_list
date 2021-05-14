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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <div class="taskList__list js-task">
            <div class="listItem">
            <div class="listItem__taskButton"><button class="listItem__Button listItem__Button--check">${task.done ? "&#10004;" : ""}</button>
            </div>
            <div class="listItem__taskName">
            <p${task.done ? " class=\"listItem__taskDone\"" : ""}>${task.taskName}</p>
            </div>
            <div class="listItem__taskButton">
                <button class="listItem__Button listItem__Button--delete js-remove">&#128465;</button>
            </div>
            </div>
            </div>
            `;
        }
        document.querySelector(".js-task").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

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