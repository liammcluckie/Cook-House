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

/**
 * Remove counter input field at value 20
 * Hide unnecessary content 
 * Change innerHTML of title
 */

counterValue = document.querySelectorAll('.counter').forEach(item => {
    value = item.value;
    if (value === "20") {
        item.previousElementSibling.innerHTML = "Supper Club Full";
        item.style.display = "none";
        item.nextElementSibling.style.display = "none";
    } 
})

