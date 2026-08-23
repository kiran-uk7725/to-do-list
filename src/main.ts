interface TodoItem {
    text: string;
    checked: boolean;
}

type StorageKey = "todo";
const STORAGE_KEY_NAME: StorageKey = "todo";

const formElem = document.querySelector<HTMLFormElement>("form")!;
const listContainer = document.getElementById("list-container") as HTMLUListElement;

const todoList: TodoItem[] = getStoredList(localStorage, STORAGE_KEY_NAME);

formElem.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();

    const inputEl = document.getElementById("input-box") as HTMLInputElement | null;
    const inputName: string = inputEl?.name || "todo";
    const formData: string = getFormData(formElem, inputName).trim();

    if (formData) {
        addTodo(formData, todoList);
        saveAndRender();
    } else {
        alert("Please enter a valid task.");
    }

    formElem.reset();
});

listContainer.addEventListener("click", (e: MouseEvent): void => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const indexAttr = target.dataset.index;
    if (indexAttr === undefined) return;

    const index = parseInt(indexAttr, 10);

    if (target.tagName === "SPAN") {
        deleteList(index, todoList);
    } else if (target.tagName === "LI") {
        toggleTodo(index, todoList);
    }
});


function getFormData(form: HTMLFormElement, fieldName: string): string {
    const formData = new FormData(form);
    const value = formData.get(fieldName);
    return typeof value === "string" ? value : "";
}

function addTodo(inputText: string, list: TodoItem[]): void {
    const exists = list.some(
        (todo) => todo.text.toLowerCase() === inputText.toLowerCase()
    );

    if (!exists) {
        list.push({ text: inputText, checked: false });
    } else {
        alert("This task already exists.");
    }
}

function getStoredList(storage: Storage, key: StorageKey): TodoItem[] {
    const saved = storage.getItem(key);
    if (!saved) return [];
    try {
        return JSON.parse(saved) as TodoItem[];
    } catch {
        return [];
    }
}

function storeTodoList(storage: Storage, data: TodoItem[], key: StorageKey): void {
    storage.setItem(key, JSON.stringify(data));
}

function toggleTodo(index: number, list: TodoItem[]): void {
    if (list[index]) {
        list[index].checked = !list[index].checked;
        saveAndRender();
    }
}

function deleteList(index: number, list: TodoItem[]): void {
    if (index >= 0 && index < list.length) {
        list.splice(index, 1);
        saveAndRender();
    }
}

function saveAndRender(): void {
    storeTodoList(localStorage, todoList, STORAGE_KEY_NAME);
    renderList(listContainer, todoList);
}

function renderList(parent: HTMLUListElement, list: TodoItem[]): void {
    parent.innerHTML = "";
    list.forEach((todo: TodoItem, index: number) => {
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


renderList(listContainer, todoList);