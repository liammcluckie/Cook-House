// Display supper club card menu

const menu = document.getElementById("event-menu");
const menuBtn = document.getElementById("menu-button");

menuBtn.onclick = function() {
    if (menu.style.display !== "none") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
};