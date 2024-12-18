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
function clearTodos() {
	if (todoData.length <= 0) {
		// alert('삭제할 할일이 없습니다.');
		return;
	}
	if (confirm('전체 삭제하시겠습니까?')) {
		todoData = [];
		localStorage.removeItem('todolist');
		todos.innerHTML = '';
	}
}
// 완료 삭제
btnDelDone.addEventListener('click', () => {
	// todoData
});

form.addEventListener('submit', (e) => {
	addItem();
	e.preventDefault();
});

items.addEventListener('click', (e) => {
	const btn = e.target.closest('.item__btn');
	if (!btn) return;
	const li = btn.closest('.item');
	const div = btn.closest('.todo-item');
	const id = li.querySelector('input').id.replace('id-', '');
	removeItem();
});

function removeItem() {
	todoData = todoData.filter((todo) => todo.id !== id);
	saveTodo(todoData);
	li.remove();
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
