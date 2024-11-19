const items = document.querySelector('.list');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__btn');

// 버튼 누르면 텍스트 값 가져오기
form.addEventListener('submit', (e) => {
	addItem();
	console.log('test');

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
      <label for="${id}">${text}</label>
    </div>
    <button class="item__btn"><i class="fa-solid fa-trash"></i></button>
  </li>
  `;

	items.insertAdjacentHTML('beforeend', li);
}

items.addEventListener('click', (e) => {
	e.target.closest('.item__btn').style.border = '1px solid red';
	const btn = e.target.closest('.item__btn');
	const li = btn.closest('.item');
	li.remove();
});
