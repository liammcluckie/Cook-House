// Auto update copyright year

document.querySelector("#copyright-year").innerText = new Date().getFullYear();

// Display supper club card menu

$("#menu-button").click(function() {
    $("#event-menu").toggle("400");
})