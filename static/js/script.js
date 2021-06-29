// Auto update copyright year

document.querySelector("#copyright-year").innerText = new Date().getFullYear();

// Display supper club card menu

document.querySelectorAll('.menu-btn').forEach(item => {
    // Loop through all buttons and add click event listeners
    item.addEventListener('click', () => {
        // Check current display of elements next sibling
        if (item.nextElementSibling.style.display === "none") {
            // Change display style if true
            item.nextElementSibling.style.display = "block";
        } else {
            item.nextElementSibling.style.display = "none";
        }
    });
});
