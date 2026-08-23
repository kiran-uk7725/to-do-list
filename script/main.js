"use strict";
const STORAGE_KEY_NAME = "todo";
// --- DOM Selectors ---
const formElem = document.querySelector("form");
const listContainer = document.getElementById("list-container");
// --- Application State ---
const todoList = getStoredList(localStorage, STORAGE_KEY_NAME);
// --- Event Handlers ---
formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputEl = document.getElementById("input-box");
    const inputName = inputEl?.name || "todo";
    const formData = getFormData(formElem, inputName).trim();
    if (formData) {
        addTodo(formData, todoList);
        saveAndRender();
    }
    else {
        alert("Please enter a valid task.");
    }
    formElem.reset();
});
listContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (!target)
        return;
    // Retrieve dataset index safely
    const indexAttr = target.dataset.index;
    if (indexAttr === undefined)
        return;
    const index = parseInt(indexAttr, 10);
    if (target.tagName === "SPAN") {
        deleteList(index, todoList);
    }
    else if (target.tagName === "LI") {
        toggleTodo(index, todoList);
    }
});
// --- Helper & State Functions ---
function getFormData(form, fieldName) {
    const formData = new FormData(form);
    const value = formData.get(fieldName);
    return typeof value === "string" ? value : "";
}
function addTodo(inputText, list) {
    // Prevent duplicate entries (case-insensitive)
    const exists = list.some((todo) => todo.text.toLowerCase() === inputText.toLowerCase());
    if (!exists) {
        list.push({ text: inputText, checked: false });
    }
    else {
        alert("This task already exists.");
    }
}
function getStoredList(storage, key) {
    const saved = storage.getItem(key);
    if (!saved)
        return [];
    try {
        return JSON.parse(saved);
    }
    catch {
        return [];
    }
}
function storeTodoList(storage, data, key) {
    storage.setItem(key, JSON.stringify(data));
}
function toggleTodo(index, list) {
    if (list[index]) {
        list[index].checked = !list[index].checked;
        saveAndRender();
    }
}
function deleteList(index, list) {
    if (index >= 0 && index < list.length) {
        list.splice(index, 1);
        saveAndRender();
    }
}
function saveAndRender() {
    storeTodoList(localStorage, todoList, STORAGE_KEY_NAME);
    renderList(listContainer, todoList);
}
function renderList(parent, list) {
    parent.innerHTML = "";
    list.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        li.dataset.index = `${index}`;
        if (todo.checked) {
            li.classList.add("checked");
        }
        const span = document.createElement("span");
        span.textContent = "\u00d7";
        span.dataset.index = `${index}`;
        li.appendChild(span);
        parent.appendChild(li);
    });
}
// Initial Application Render
renderList(listContainer, todoList);
