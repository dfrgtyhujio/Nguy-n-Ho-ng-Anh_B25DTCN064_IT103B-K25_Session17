const initialTodos = [
    { id: 1, task: "Mua bánh chưng", done: false },
    { id: 2, task: "Dọn nhà đón Tết", done: false },
    { id: 3, task: "Gói bánh chưng", done: false },
    { id: 4, task: "Trang trí nhà cửa bằng hoa mai, hoa đào", done: false },
    { id: 5, task: "Mua phong bao lì xì", done: false },
    { id: 6, task: "Chuẩn bị mâm ngũ quả", done: false }
];

let todos = [];
let editingIndex = null;

function loadTodos() {
    let data = localStorage.getItem("myTodos");

    if (data) {
        todos = JSON.parse(data);
    } else {
        todos = initialTodos;
        saveData();
    }
}

function renderTodos() {
    let list = document.getElementById("todo-list");

    if (todos.length === 0) {
        list.innerHTML = `<p class="empty">Chưa có công việc nào...</p>`;
        updateStats();
        return;
    }

    let str = "";

    for (let i = 0; i < todos.length; i++) {
        let content = "";
        if (editingIndex === i) {
            content = `<input value="${todos[i].task}" id="edit-${i}" onkeydown="handleEditKey(event,${i})">`;
        } else {
            content = `<span onclick="toggleTodo(${i})">${todos[i].done ? "✓" : "○"} ${todos[i].task}</span>`;
        }

        str += `
            <li class="${todos[i].done ? "done" : ""}">
                <div class="todo-left">${content}</div>
                <div class="actions">
                    <span onclick="startEdit(${i})">✏️</span>
                    <span onclick="deleteTodo(${i})">🗑️</span>
                </div>
            </li>
        `;
    }
    list.innerHTML = str;

    if (editingIndex !== null) {
        let input = document.getElementById("edit-" + editingIndex);
        input.focus();
        input.select();
    }
    updateStats();
}

function updateStats() {
    let total = todos.length;
    let done = todos.filter(t => t.done).length;

    let percent = total === 0 ? 0 : ((done / total) * 100).toFixed(1);

    document.getElementById("stats").innerText =
        `Tổng công việc: ${total} | Đã hoàn thành: ${done} (${percent}%)`;
}

function addTodo() {
    let input = document.getElementById("task-input");

    let task = input.value.trim();

    if (task === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }

    todos.push({
        id: Date.now(),
        task: task,
        done: false
    });

    input.value = "";

    saveData();
    renderTodos();
}

function toggleTodo(index) {
    if (editingIndex !== null) return;

    todos[index].done = !todos[index].done;

    saveData();
    renderTodos();
}

function deleteTodo(index) {

    let confirmDelete = confirm("Bạn có chắc muốn xóa công việc này?");

    if (confirmDelete) {
        todos.splice(index, 1);
        saveData();
        renderTodos();
    }
}

function startEdit(index) {

    editingIndex = index;
    renderTodos();
}

function handleEditKey(e, index) {

    if (e.key === "Enter") {

        let newValue = e.target.value.trim();

        if (newValue === "") {
            alert("Tên công việc không được rỗng");
            return;
        }

        todos[index].task = newValue;

        editingIndex = null;

        saveData();
        renderTodos();
    }

    if (e.key === "Escape") {

        editingIndex = null;
        renderTodos();
    }
}

function clearAll() {
    let confirmClear = confirm("Bạn có chắc muốn xóa toàn bộ danh sách?");
    if (confirmClear) {
        todos = [];

        saveData();
        renderTodos();
    }
}

function saveData() {
    localStorage.setItem("myTodos", JSON.stringify(todos));

}

document.getElementById("task-input").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        addTodo();
    }

});

loadTodos();
renderTodos();