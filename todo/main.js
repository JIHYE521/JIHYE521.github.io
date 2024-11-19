const items = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__btn');

form.addEventListener('submit', (e) => {
	addItem();
	e.preventDefault();
});

// todo 추가하기
function addItem() {
	let text = input.value;
	if (text.trim() === '') {
		input.focus();
		return;
	}
	const id = crypto.randomUUID();
	createItem(text, id);
	input.value = '';
	input.focus();
}

// todo 만들기
function createItem(text, id) {
	const li = `
  <li class="item">
    <div>
      <input type="checkbox" id="id-${id}"/>
      <label for="id-${id}" class="item__label">${text}</label>
    </div>
    <button class="item__btn"><i class="fa-solid fa-trash"></i></button>
  </li>
  `;
	items.insertAdjacentHTML('beforeend', li);
	setTodo(id, text);
}

// todo 삭제하기
items.addEventListener('click', (e) => {
	const btn = e.target.closest('.item__btn');
	if (!btn) return;
	const li = btn.closest('.item');
	li.remove();
});

const todoData = [];

// 불러오기
function getTodo() {
	let getData = localStorage.getItem('todolist');
	getData = JSON.parse(getData);
	if (!getData) return;
	initTodo(getData);
}
getTodo();

// 저장하기
function setTodo(id, text) {
	todoData.push({ id, text, isChecked: false });
	console.log(todoData);
	localStorage.setItem('todolist', JSON.stringify(todoData));
}

function initTodo(todolist) {
	todolist.forEach(({ id, text, isChecked }) => {
		const li = `
      <li class="item">
        <div>
          <input type="checkbox" id="id-${id}" ${isChecked ? 'checked' : ''}/>
          <label for="id-${id}" class="item__label">${text}</label>
        </div>
        <button class="item__btn"><i class="fa-solid fa-trash"></i></button>
      </li>
    `;
		items.insertAdjacentHTML('beforeend', li);
	});
}
