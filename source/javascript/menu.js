//menu bar hamburger closing and opening
const hamburger = document.querySelector('.hamburger');
const mobile_menu = document.querySelector('.mobile-menu');
/*
Menu bar closing and opening 
*/
hamburger.addEventListener('click', function() {
	hamburger.classList.toggle('is-active');
	mobile_menu.classList.toggle('is-active');
})