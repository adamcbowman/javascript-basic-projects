const buttons = document.querySelector('.button-container');
const countEl = document.getElementById('value');

let count = 0;

function handleClick(event) {
    if (event.target.id === 'decreaseBtn') {
        count -= 1;
    } else if (event.target.id === 'resetBtn') {
        count = 0;
    } else if (event.target.id === 'increaseBtn') {
        count += 1;
    } 
    countEl.textContent = count
    
    if (count < 0) {
        countEl.style.color='red'
    } else if (count > 0) {
        countEl.style.color='green'
    } else {
        countEl.style.color=''
    }
}

buttons.addEventListener('click', handleClick);
