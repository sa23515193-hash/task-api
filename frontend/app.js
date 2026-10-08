/*
  Backend URL

  Local:
  http://localhost:5000/api

  After Render deployment:
  https://YOUR-APP-NAME.onrender.com/api
*/

const API_BASE =
  "http://localhost:5000/api";


let tasks = [

  {
    id: 1,
    title: "Build REST API",
    description:
      "Create Express CRUD endpoints",
    status: "completed",
    createdAt: "Today"
  },

  {
    id: 2,
    title: "Connect MongoDB",
    description:
      "Configure Mongoose database connection",
    status: "in-progress",
    createdAt: "Today"
  },

  {
    id: 3,
    title: "Implement JWT Authentication",
    description:
      "Protect task routes with JWT",
    status: "in-progress",
    createdAt: "Yesterday"
  },

  {
    id: 4,
    title: "Add Request Validation",
    description:
      "Validate incoming API data",
    status: "pending",
    createdAt: "Yesterday"
  },

  {
    id: 5,
    title: "Write Swagger Documentation",
    description:
      "Document every API endpoint",
    status: "completed",
    createdAt: "2 days ago"
  },

  {
    id: 6,
    title: "Prepare Render Deployment",
    description:
      "Deploy the backend to Render",
    status: "completed",
    createdAt: "2 days ago"
  }

];


const taskList =
  document.getElementById(
    "taskList"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const modal =
  document.getElementById(
    "taskModal"
  );


// STATUS LABEL
function getStatusLabel(status) {

  if (
    status ===
    "in-progress"
  ) {
    return "In Progress";
  }

  return (
    status.charAt(0)
      .toUpperCase() +
    status.slice(1)
  );
}


// ESCAPE HTML
function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,
    (character) => {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[
        character
      ];
    }
  );
}


// RENDER TASKS
function renderTasks(
  search = ""
) {

  const filteredTasks =
    tasks.filter((task) => {

      const text =
        `${task.title} ${task.description}`;

      return text
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );
    });


  taskList.innerHTML =
    filteredTasks
      .map(
        (task) => {

          const completed =
            task.status ===
            "completed";

          return `

            <div class="task-item">

              <div
                class="task-check ${
                  completed
                    ? "completed"
                    : ""
                }"
              >
                ${
                  completed
                    ? "✓"
                    : "○"
                }
              </div>


              <div class="task-content">

                <h4>
                  ${escapeHTML(
                    task.title
                  )}
                </h4>

                <p>
                  ${escapeHTML(
                    task.description ||
                    "No description"
                  )}
                </p>

              </div>


              <div class="task-meta">

                <span
                  class="status ${
                    task.status
                  }"
                >
                  ${getStatusLabel(
                    task.status
                  )}
                </span>

                <small>
                  ${
                    task.createdAt ||
                    "Just now"
                  }
                </small>

              </div>

            </div>

          `;
        }
      )
      .join("");


  updateStatistics();
}


// UPDATE STATISTICS
function updateStatistics() {

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      task =>
        task.status ===
        "completed"
    ).length;

  const progress =
    tasks.filter(
      task =>
        task.status ===
        "in-progress"
    ).length;

  const pending =
    tasks.filter(
      task =>
        task.status ===
        "pending"
    ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) *
            100
        );


  document.getElementById(
    "allCount"
  ).textContent = total;


  document.getElementById(
    "progressCount"
  ).textContent = progress;


  document.getElementById(
    "completedCount"
  ).textContent =
    completed;


  document.getElementById(
    "pendingCount"
  ).textContent =
    pending;


  document.getElementById(
    "taskSummary"
  ).textContent =
    `${total} tasks`;


  document.getElementById(
    "heroTotal"
  ).textContent =
    total;


  document.getElementById(
    "heroCompleted"
  ).textContent =
    completed;


  document.getElementById(
    "heroPercentage"
  ).textContent =
    `${percentage}%`;


  document.getElementById(
    "heroProgress"
  ).style.width =
    `${percentage}%`;
}


// SEARCH
searchInput.addEventListener(
  "input",
  (event) => {

    renderTasks(
      event.target.value
    );

  }
);


// OPEN MODAL
document.getElementById(
  "newTaskButton"
).addEventListener(
  "click",
  () => {

    modal.classList.remove(
      "hidden"
    );

  }
);


// CLOSE MODAL
document.getElementById(
  "closeModal"
).addEventListener(
  "click",
  () => {

    modal.classList.add(
      "hidden"
    );

  }
);


// CLOSE WHEN CLICKING OUTSIDE
modal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === modal
    ) {

      modal.classList.add(
        "hidden"
      );

    }

  }
);


// CREATE DEMO TASK
document.getElementById(
  "taskForm"
).addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const title =
      document.getElementById(
        "taskTitle"
      ).value.trim();


    const description =
      document.getElementById(
        "taskDescription"
      ).value.trim();


    const status =
      document.getElementById(
        "taskStatus"
      ).value;


    tasks.unshift({

      id: Date.now(),

      title,

      description,

      status,

      createdAt:
        "Just now"

    });


    event.target.reset();


    modal.classList.add(
      "hidden"
    );


    renderTasks(
      searchInput.value
    );

  }
);


// LOGIN BUTTON
document.getElementById(
  "loginButton"
).addEventListener(
  "click",
  () => {

    alert(
      "Connect this button to POST /api/auth/login after deploying the backend."
    );

  }
);


// INITIAL RENDER
renderTasks();
