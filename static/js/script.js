// Auto update copyright year

document.querySelector("#copyright-year").innerText = new Date().getFullYear();

/**
 * Display supper club menu
 * Rotate caret icon
 */

document.querySelectorAll('.event-card-btn-js').forEach(item => {
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
    const value = item.value;
    if (value === "20") {
        item.previousElementSibling.innerHTML = "Supper Club Full";
        item.style.display = "none";
        item.nextElementSibling.style.display = "none";
    } 
})

/**
 * Check that user input is greater than current counter value
 * Only display inserted html once
 * Logic to check user input against min value taken from current value in DB
 * Insert HTML into DOM
 * When Correct value entered display button 
 */

 checkCounterValue = document.querySelectorAll('.counter').forEach(item => {
    item.addEventListener('blur', () => {
        // Remove error message if one is present
        item.parentElement.querySelectorAll('.counter-error').forEach(counterError => counterError.remove())
        // Store current value to check against min value which is also current value
        const value = Number(item.value);
        const min = Number(item.min);
        let counterError = document.createElement('p');
        counterError.setAttribute('class', 'counter-error');
        if (value <= min) {
            // Create html error message to instert into DOM
            counterError.innerHTML = "Guests entered has not been added to the current total";
            item.insertAdjacentElement('afterend', counterError);
        } else if (value > 20) {
            counterError.innerHTML = "Guests entered exceeds maximum amount";
            item.insertAdjacentElement('afterend', counterError);
        } else {
            // When input truthy display button
            const joinForm = item.parentElement;
            joinForm.querySelectorAll('.event-join-btn').forEach(joinButton => joinButton.style.display = "block");
        }
    });
});

// Display event confirm with email section

joinClub = document.querySelectorAll('.event-join-btn').forEach(item => {
    item.addEventListener('click', () => {
        item.nextElementSibling.style.display = "block"
    });
});

/**
 * Join event cancel button functionality
 * Traverse up the DOM to select form top level parent
 * Select counter number input
 * Rest input with current value in DB
 */

cancelJoinClub = document.querySelectorAll('.event-cancel-btn').forEach(item => {
    item.addEventListener('click', () => {
        // Traverse up the DOM to select form element
        const parentFirst = item.parentElement;
        const parentSecond = parentFirst.parentElement;
        const parentForm = parentSecond.parentElement;
        // Select counter input
        parentForm.querySelectorAll('.counter').forEach(counter => {
            // Store and reset counter value
            const counterResetValue = Number(counter.min);
            counter.value = counterResetValue;
        })
        // Set confirm join event display
        item.parentElement.style.display = "none";
    });
});



