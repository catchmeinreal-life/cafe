// This script toggles the navigation menu on mobile devices
// and handles the click event to show or hide the menu.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});


// Close the menu when clicking outside of it
// This ensures that the menu closes when clicking outside of it
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('show');
    }
});