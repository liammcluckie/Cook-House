[Return to ReadMe file](README.md)

## Testing Table of Contents

### 1. [Code Validation](#code-validation)

### 2. [User Story Testing](#user-story-testing)

- [First Time Visitor Goals Testing](#first-time-visitor-goals-testing)
    
- [Returning Visitor Goals Testing](#returning-visitor-goals-testing)

- [Frequent Visitor Goals Testing](#frequent-visitor-goals-testing)

### 3. [Browser Compatibility and Device Responsiveness Testing](#browser-compatibility-and-device-responsiveness-testing)

### 4. [Google Lighthouse Testing](#google-lighthouse-testing)

### 5. [Further Testing](#further-testing)

### 6. [Bugs](#bugs)

## Code Validation

Throughout this project all code has been regularly ran through HTML, CSS and Javascript validators to ensure there are no errors within the code. See below screenshots of all validated and passed code. Due to the nature of this project and the use of Jinja templating code the HTML was passed into the validator from viewing page source in the browser.

Outlined for each page is the decision why the warnings present have not been corrected.

### [CSS Validation](testing/css-valid.png)

- The majority of warnings present relate to unknown prefix vendors that have been added by [Autoprefixer](https://autoprefixer.github.io/) to increase cross browser compatibility. These warnings have not been corrected due to this know being a necessary practice.

---

### [HTML Validation](testing/html-valid.png)

- Due to the nature of this project and some content being dynamically added using Jinja templating loops this caused errors within HTML files due to required unique attributes repeating names. 
    - Since these were all event elements the fix was adding `{{ event._id }}` to these duplicated attributes in order to make them unique again.

- There are no errors present for any html pages within this project, however, there is a warning caused by a section having no `<h></h>` tag.
    - This warning is present due to the section including Flash messages that if not displayed mean the section does not include the desired `<h></h>` tag. I felt that this warning did not need to be corrected in this circumstance.

---

### [Javascript Validation](testing/js-valid.png)

Warnings Present:

- The unused variable name `validateForm` is an event function that gets called withing the HTML file `contact.html`. Due to this this warning can be ignored and no changes were made.

- The two instances of the same undefined variable `emailjs` is caused from the code required to call and run the Emailjs send mail function. Therefore this warning can be ignore and no changes were made.

- The undefined variable `$` is caused from the use of the Javascript library JQuery that JSHint does not recognise. Therefore this warning can be ignored and no changed were made.