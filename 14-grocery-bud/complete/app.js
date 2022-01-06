// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem(id, value)
    container.classList.add('show-container');
    addToLocalStorage(id, value);
    setBackToDefault();
    displayAlert(`${value} added to list`, 'success');
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert(`${value} updated`, 'success');
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert('Please enter a value', 'danger');
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const item = element.firstElementChild.innerHTML;
  const id = element.dataset.id;
  list.removeChild(element);
  if (!list.children.length) {
    container.classList.remove('show-container');
  }
  displayAlert(`${item} deleted`, 'danger');
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit';
  grocery.focus();
}

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  if (items.length) {
    items.forEach((item) => {
      list.removeChild(item);
    });
    container.classList.remove('show-container');
    displayAlert('list cleared', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
  }
}

function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'Submit';
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value) {
  const item = { id, value };
  let items = getLocalStorage();
  items.push(item);

  localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}

// ****** SETUP ITEMS **********

function setupItems() {
    let items = getLocalStorage();

    if(items.length) {
        items.forEach( item => {
            createListItem(item.id, item.value);
        })
        container.classList.add('show-container');
    }
}

function createListItem(id, value) {
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        `;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    list.appendChild(element);
}