const items = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__btn');

let todoData = [];

form.addEventListener('submit', (e) => {
	addItem();
	e.preventDefault();
});

items.addEventListener('click', (e) => {
	const btn = e.target.closest('.item__btn');
	if (!btn) return;
	const li = btn.closest('.item');
	const id = li.querySelector('input').id.replace('id-', '');
	console.log(id);

	todoData = todoData.filter((todo) => todo.id !== id);
	saveTodo(todoData);

	li.remove();
});

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
      <input type="checkbox" id="id-${id}"/>
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
