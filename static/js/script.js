// Auto update copyright year

document.querySelector("#copyright-year").innerText = new Date().getFullYear();

/**
 * Display supper club menu
 * Rotate caret icon
 */

document.querySelectorAll('.event-card-btn').forEach(item => {
    // Loop through all buttons and add click event listeners
    item.addEventListener('click', () => {
        const caret = item.querySelector('.caret');
        // Check current display of elements next sibling
        if (item.nextElementSibling.style.display === "" || item.nextElementSibling.style.display === "none") {
            caret.classList.add('rotate');
            // Change display style if true
            item.nextElementSibling.style.display = "block";
        } else {
            caret.classList.remove('rotate');
            item.nextElementSibling.style.display = "none";
        }
    });
});