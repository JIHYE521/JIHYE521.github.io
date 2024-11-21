const items = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__btn');
const todos = document.querySelector('.list');
const todo = document.querySelector('.delete-done');

const btns = document.querySelector('.btns');
const filterDone = document.querySelector('.filter-done');
const filterUndone = document.querySelector('.filter-undone');
const btnDelAll = document.querySelector('.delete-all');
const btnDelDone = document.querySelector('.delete-done');

let todoData = [];

// 완료 목록

// 미완료 목록

// 전체 삭제
btnDelAll.addEventListener('click', clearTodos);

// 완료 삭제
btnDelDone.addEventListener('click', cleartDoneTodos);

function clearTodos() {
	if (todoData.length <= 0) {
		return;
	}
	if (confirm('전체 삭제하시겠습니까?')) {
		todoData = [];
		localStorage.removeItem('todolist');
		renderTodos(todoData);
	}
}

function cleartDoneTodos() {
	const filterData = todoData.filter((todo) => todo.isChecked !== true);
	todoData = filterData;
	saveTodo(todoData);
	renderTodos(todoData);
}

form.addEventListener('submit', (e) => {
	addItem();
	e.preventDefault();
});

items.addEventListener('click', (e) => {
	const btn = e.target.closest('.item__btn');
	if (!btn) return;
	const li = btn.closest('.item');
	const id = li.querySelector('input').id.replace('id-', '');
	removeItem(li, id);
});

items.addEventListener('change', (e) => {
	const id = e.target.id.replace('id-', '');
	todoData = todoData.map((todo) => (todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo));
	saveTodo(todoData);
});

function removeItem(item, id) {
	todoData = todoData.filter((todo) => todo.id !== id);
	saveTodo(todoData);
	item.remove();
}

function addItem() {
	let text = input.value;
	if (text.trim() === '') {
		input.focus();
		return;
	}
	const id = crypto.randomUUID();
	const newTodo = { id, text, isChecked: false };
	todoData.push(newTodo);
	addTodo(newTodo);
	saveTodo(todoData);

	const addedItem = items.lastElementChild;
	addedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

	input.value = '';
	input.focus();
}

function addTodo({ id, text, isChecked }) {
	const li = createElement(id, text, isChecked);
	items.insertAdjacentHTML('beforeend', li);
}

function createElement(id, text, isChecked) {
	return `
  <li class="item">
    <div>
      <input type="checkbox" id="id-${id}" ${isChecked ? 'checked' : ''}/>
      <label for="id-${id}" class="item__label">${text}</label>
    </div>
    <button class="item__btn"><i class="fa-solid fa-trash"></i></button>
  </li>
  `;
}

function renderTodos(todos) {
	items.innerHTML = '';

	todos.forEach(({ id, text, isChecked }) => {
		const li = createElement(id, text, isChecked);
		items.insertAdjacentHTML('beforeend', li);
	});
}

function saveTodo(todolist) {
	localStorage.setItem('todolist', JSON.stringify(todolist));
}

function getTodo() {
	const getData = localStorage.getItem('todolist');
	if (!getData) return;
	todoData = JSON.parse(getData);
	todoData.forEach(addTodo);
}

getTodo();
