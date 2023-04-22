let createBtn = document.querySelector('#create');
let projectCreate = document.getElementById('project-create');
let todoCreate = document.getElementById('create');
let container = document.querySelector('.display');
let projects = [];
let projectContainer;
let todos = [];
let currentProject;
let currentTodo;
let f;
// clear();
displayProjects();
// render();
display();
function Projects(name) {
    this.name = name;
}
function Todos(title, description, dueDate, priority, project, checked) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.checked = checked;
    console.log("This todo is in :", project);
}
createBtn.addEventListener('click', () => {
    console.log(createBtn);
    console.log("Success");
});
projectCreate.addEventListener('click', () => {
    let f = 0;
    const projectName = document.getElementById('p-name').value;
    for (let i in projects) {
        if (projects[i].name == projectName) {
            alert("Same Project Name already created!!");
            f = 1;
        }
    }
    if (projectName == "")
        alert("Project Name cannot be empty");
    // console.log(projectName);
    else if (f == 0) {
        clear();
        createProject(projectName);
    }
});
todoCreate.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    if (title == "" || description == "" || dueDate == "" || priority == "")
        alert("All fields are required");
    else if (currentProject == undefined)
        alert("First create a project");
    // console.log(projectName);
    else
        createTodo(title, description, dueDate, priority, currentProject);
});
function createProject(projectName) {
    let project = new Projects(projectName, currentTodo);
    projects.push(project);
    let container = document.querySelector('.projects');
    projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');
    let name = document.createElement('p');
    name.classList.add('project-title');
    name.textContent = projectName;
    container.appendChild(projectContainer);
    projectContainer.appendChild(name);
    currentProject = projectName;
    clear();
    // render();
    display(currentProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    // clear();
    projectContainer.addEventListener('click', () => {
        console.log(projectName);
        currentProject = projectName;
        clear();
        render();
        display(currentProject);
    });
}
function createTodo(titleText, descriptionText, dueDateText, priorityText, currentProject) {
    let todo = new Todos(titleText, descriptionText, dueDateText, priorityText, currentProject, false);
    todos.push(todo);
    // clear();
    // render();
    let todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.classList.add('check');
    let title = document.createElement('p');
    let description = document.createElement('p');
    let dueDate = document.createElement('p');
    let priority = document.createElement('div');
    if (todo.priority == "Normal")
        priority.classList.add('normal');
    else
        priority.classList.add('urgent');
    title.classList.add('todo-title');
    title.textContent = todo.title;
    description.classList.add('todo-title');
    description.textContent = todo.description;
    dueDate.classList.add('todo-title');
    dueDate.textContent = todo.dueDate;
    priority.classList.add('todo-title');
    priority.textContent = todo.priority;
    container.appendChild(todoContainer);
    todoContainer.appendChild(check);
    todoContainer.appendChild(title);
    todoContainer.appendChild(description);
    todoContainer.appendChild(dueDate);
    todoContainer.appendChild(priority);
    if (todo.checked == true) {
        todoContainer.style.textDecoration = "line-through";
        check.checked = true;
        todoContainer.style.opacity = '0.5';
    }
    else {
        todoContainer.style.textDecoration = "none";
        todoContainer.style.opacity = '1';
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}
function render() {
    // clear();
    let todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    let title = document.createElement('h1');
    let description = document.createElement('h1');
    let dueDate = document.createElement('h1');
    let priority = document.createElement('h1');
    title.classList.add('todo-title');
    title.textContent = "Title";
    description.classList.add('todo-title');
    description.textContent = "Description";
    dueDate.classList.add('todo-title');
    dueDate.textContent = "Due Date";
    priority.classList.add('todo-title');
    priority.textContent = "Priority";
    container.appendChild(todoContainer);
    todoContainer.appendChild(title);
    todoContainer.appendChild(description);
    todoContainer.appendChild(dueDate);
    todoContainer.appendChild(priority);
}
function displayProjects(projectName) {
    projects = JSON.parse(localStorage.getItem("projects") || "[]");
    clear();
    for (let i in projects) {
        console.log(projects[i].name);
        let container = document.querySelector('.projects');
        projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
        let name = document.createElement('p');
        name.classList.add('project-title');
        name.textContent = projects[i].name;
        container.appendChild(projectContainer);
        projectContainer.appendChild(name);
        currentProject = projectName;
        clear();
        // render();
        projectContainer.addEventListener('click', () => {
            console.log(projects[i].name);
            currentProject = projects[i].name;
            clear();
            render();
            display(currentProject);
        });
    }
}
function display() {
    // todos = JSON.parse(localStorage.getItem("todos") || "[]");
    // clear();
    for (let i in todos) {
        // for (let j in todos[i])
        console.log(todos[i].project);
        if (todos[i].project == currentProject) {
            let todoContainer = document.createElement('div');
            todoContainer.classList.add('todo-container');
            let check = document.createElement('input');
            check.setAttribute('type', 'checkbox');
            check.classList.add('check');
            let title = document.createElement('p');
            let description = document.createElement('p');
            let dueDate = document.createElement('p');
            let priority = document.createElement('div');
            if (todos[i].priority == "Normal")
                priority.classList.add('normal');
            else
                priority.classList.add('urgent');
            title.classList.add('todo-title');
            title.textContent = todos[i].title;
            description.classList.add('todo-title');
            description.textContent = todos[i].description;
            dueDate.classList.add('todo-title');
            dueDate.textContent = todos[i].dueDate;
            priority.classList.add('todo-title');
            priority.textContent = todos[i].priority;
            container.appendChild(todoContainer);
            todoContainer.appendChild(check);
            todoContainer.appendChild(title);
            todoContainer.appendChild(description);
            todoContainer.appendChild(dueDate);
            todoContainer.appendChild(priority);
            console.log(todos[i].checked);
            if (todos[i].checked == true) {
                todoContainer.style.textDecoration = "line-through";
                check.checked = true;
                todoContainer.style.opacity = '0.5';
            }
            else {
                todoContainer.style.textDecoration = "none";
                todoContainer.style.opacity = '1';
            }
            check.addEventListener('click', () => {
                if (check.checked == true) {
                    todos[i].checked = true;
                    todoContainer.style.textDecoration = "line-through";
                    todoContainer.style.opacity = '0.4';
                }
                else {
                    todos[i].checked = false;
                    todoContainer.style.textDecoration = "none";
                    todoContainer.style.opacity = '1';
                }
            })
        }
    }
}
function clear() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}