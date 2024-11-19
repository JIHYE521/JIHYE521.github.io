const items = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__btn');

// TODO
// 로컬호스트 저장
// 정렬

form.addEventListener('submit', (e) => {
	addItem();
	e.preventDefault();
});

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

function createItem(text, id) {
	const li = `
  <li class="item">
    <div>
      <input type="checkbox" id="${id}"/>
      <label for="${id}" class="item__label">${text}</label>
    </div>
    <button class="item__btn"><i class="fa-solid fa-trash"></i></button>
  </li>
  `;

	items.insertAdjacentHTML('beforeend', li);
}

items.addEventListener('click', (e) => {
	const btn = e.target.closest('.item__btn');
	if (!btn) return;
	const li = btn.closest('.item');
	li.remove();
});
