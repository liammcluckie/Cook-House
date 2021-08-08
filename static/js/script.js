// Auto update copyright year

document.querySelector("#copyright-year").innerText = new Date().getFullYear();

/**
 * Display supper club menu
 * Rotate caret icon
 */

document.querySelectorAll('.event-menu-btn').forEach(item => {
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

/**
 * Disable user ability to select dates prior to the current date
 * Code taken from https://www.codegrepper.com/code-examples/html/how+to+disable+previous+date+in+html+input+type+date
 */

$(document).ready(function() {
    const dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10) {
        month = '0' + month.toString();
    }
    if (day < 10) {
        day = '0' + day.toString();
    }
    
    const maxDate = year + '-' + month + '-' + day;
    $('#date').attr('min', maxDate);
});

// Emails

/**
 * Call function to intialise emailjs
 * Retrieve form data to pass into function with key that matched emailjs template
 * Validate the users input and display success/error messages accordingly
 */

(function(){
    emailjs.init("user_9Z5AP7qghYkLu9E9UhaLn");
})();

function sendMail(contactForm) {
    emailjs.send("service_n592rgm", "cook_house", {
        "first_name": contactForm.fname.value,
        "last_name": contactForm.lname.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value
    })
    .then(
        function success() {
            const success = document.getElementById('contact-success');
            success.style.display = "block";
        }
    );
    document.getElementById("contact-form").reset();
    return false;
}

// Validate

function validateForm(event) {
    event.preventDefault();
    // Form Data
    const fName = document.getElementById("fname").value;
    const lName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message");
    // Valid Regex code taken from https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php
    const validCharacters = /^[a-zA-Z\s]*$/;
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // Store test in variables
    const correctFname = validCharacters.test(fName);
    const correctLname = validCharacters.test(lName);
    const correctEmail = validEmail.test(email); 
    const messageLength = message.value.trim().length;
    // Check user input
    if (!correctFname) {
        document.getElementById('fname-error').style.display = "block";
    } else {
        document.getElementById('fname-error').style.display = "none";
    }

    if (!correctLname) {
        document.getElementById('lname-error').style.display = "block";
    } else {
        document.getElementById('lname-error').style.display = "none";
    }

    if (!correctEmail) {
        document.getElementById('email-error').style.display = "block";
    } else {
        document.getElementById('email-error').style.display = "none";
    }

    if (messageLength === 0) {
        document.getElementById('message-error').style.display = "block";
    } else {
        document.getElementById('message-error').style.display = "none";
    }

    if (correctFname && correctLname && correctEmail && messageLength > 0) {
        document.querySelectorAll('.contact-error').forEach(contactError => {
            contactError.style.display = "none";
        });
        const form = document.getElementById("contact-form");
        sendMail(form);
    }
}   