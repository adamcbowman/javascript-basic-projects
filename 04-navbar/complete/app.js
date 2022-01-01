// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const links = document.querySelector('.links');
const menuBtn = document.querySelector('.nav-toggle');

menuBtn.addEventListener('click', () => 
    links.classList.toggle('show-links')
);