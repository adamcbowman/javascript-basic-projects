//using selectors inside the element

const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  const btn = question.querySelector('.question-btn');
  btn.addEventListener('click', () => {
    // hide open questions
    questions.forEach((item) => {
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });

    // show/hide clicked question
    question.classList.toggle('show-text');
  });
});

// traversing the dom
// const buttons = document.querySelectorAll('.question-btn');

// buttons.forEach( (btn) => {
//     btn.addEventListener('click', (e) => {
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     });
// });
