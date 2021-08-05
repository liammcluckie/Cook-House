# Cook House

[View Live Project Here](https://cook-house-project.herokuapp.com/)

![Screenshot of landing page on multiple devices](testing/responsive-test/responsive-screenshot.png)

## Overview 

Cook House is a website that focuses on bringing strangers and friends together through the simple art of food, drink and conversation. The purpose of this website is for like minded users that either want to attend or host private supper clubs in their own homes to be able to do so through this platform. Users will be able to create an event in order to host their own evening which will be open invitation (with limited numbers) for any other members of the website. The author of the event will be able to choose the cuisine, dress code and other optional extras. Users will also be able to leave reviews on hosts profile as well as ask further questions on the event post. This project will have a strong focus on database creation and usage. 

## Table of Contents

### 1. [UX](#ux) 
    
#### 1a. [User Stories](#user-stories)

#### 1b. [User Centered Design](#user-centered-design)
- Strategy 
- Scope 
- Structure 
- Wireframes

### 2. [Design](#design)
- Colour Scheme
- Typography
- Imagery

### 3. [Database Model](#database-model)

### 4. [Features](#features)

### 5. [Technologies Used](#technologies-used)
- Syntax
- Frameworks, Libraries & Programs

### 6. [Testing](#testing)
- [Testing Document](TESTING.md)

### 7. [Deployment](#deployment)

#### 7a. GitHub Pages
- Forking the Repository 
- Cloning the Repository

#### 7b. Heroku

### 8. [Credits](#credits)
- Resources
- Code 
- Content
- Media
- Acknowledgements

## UX

### User Stories

- **User Goals**

    a. As a user, I want to be able to access the site from any device.

    b. As a user, I want to know that my personal information is safe and stored securely on a database.

    c. As a user, I want to enjoy using the website through great aesthetics and a strong UX/UI.

    d. As a user, I want to be able to find using the websites functionality simple with clear instructions.

    e. As a user, I want to have full control of my account following computer programming CRUD (create, read, update & delete) operations.

    f. As a user, I want to have full control of my created events following computer programming CRUD (create, read, update & delete) operations.

- **First Time Visitor Goals**

    a. As a first time visitor, I want to immediately and clearly understand the purpose of the website.

    b. As a first time visitor, I want to see a gallery section from other users supper clubs to gain a better understanding of the offering available.

    c. As a first time visitor, I want to find creating an account a quick, simple and secure process.

- **Returning Visitor Goals**

    a. As a returning visitor, I want to be able to search the website to find supper clubs by location and cuisine.

    b. As a returning visitor, I want to be able to register to attend supper clubs and find out further information through asking the host questions.

    c. As a returning visitor, I want to be able to see further examples of what other users have used the platform for to enhance understanding.

    d. As a returning visitor, I want to be able to contact the websites admin if I have any issues or questions.

- **Frequent Visitor Goals** 

    a. As a frequent visitor, I want to be able to leave reviews on hosts past supper clubs that I've attended.

    b. As a frequent visitor, I want to be able to create my own supper club evenings easily whilst adding all the necessary details specific to my event.

    c. As a frequent visitor, I want to be able to manage my own posts either by editing or deleting them.

    d. As a frequent visitor, I want using the website to have a good community feel through active and regular user activity.

---

### User Centered Design

#### Strategy

- The main goal of this website is to convert visitors into registered and active users. Due to the nature of this website there will be a lot of content only available to registered users, such as events and host information. This means that in order to convert a visitor the landing page has to draw them in, which will be done using a bold and fun colour palette as well as aesthetically pleasing imagery and imagery displaying the enjoyment of users from this website.

- Private supper clubs are not always a common and well known activity and historically they have always been shrouded in secrecy. To further increase the chance of converting visitors into users there will need to be a clear and well detailed about section. This should include a brief history explaining what a supper club is and a short introduction of how this website is used for these events. This section needs to be short as to not overwhelm users, and also fit into the rest of the websites aesthetics complimenting the imagery and design of the landing page.

- The main functionality of this website and the ideal steps a new user would take are the following;

    - Explore the websites landing page, taking in the imagery and information.

    - If a new visitor had any questions to send these via a contact form.

    - Create a new account and update profile details.

    - Explore the additional features available to registered users. 
    
    - Look at upcoming supper clubs, and search the websites database to see the types of events that have been done previously.

    - Express interest and attend a supper club.

    - Post their own supper club evening event.

    - Remain a regular and active user, attending and hosting supper clubs as well as leaving reviews.

    This will all be achieved through creating a clear and strong UI focusing on well structured content hierarchy. By doing this the website without necessarily giving the user physical instructions will lead the user to all the above steps.

--- 

#### Scope | Trade Off

- **The main features and content in the initial design plan that are of highest priority are;**

    - Fully responsive website regardless of viewing device size.

    - Fixed navigation bar.

    - About section included on the landing page.

    - Gallery section included on the landing page using images from previous events.

    - Validated and functioning contact form using [Emailjs.](https://www.emailjs.com/)

    - Allow users to create and manage their own account.

    - Allow users to create event posts with full CRUD functionality.

    - The ability for logged in users to search the websites database for events by location, name and cuisine.

    - The website will include a home page, register & sign in page, contact page, supper club page, and create event page.
        - The supper club and create event page will be hidden to any visitors not signed into an account.

    - A form for users to fill out in order to create a supper club event which will then be listed on the websites supper club page.

    - For users to be able to leave reviews/comments on supper club events.

- **The features and content in the initial design plan that are of a lower priority and may not be including in this build are;**

    - A feature that allows users to click attend/register interest for a specific supper club event.

    - Testimonial section to possibly further enhance the chance of converting a visitor to a user.

    - Integrating [Google Maps API](https://developers.google.com/maps) to display the location of supper club events to users.

    - The ability for users to customise and add further information to their profile page such as preferences, images, bio descriptions etc.

    - A featured users section that includes top rated/most active and past events they have hosted.

---

#### Structure

- The basic structure of the website is;

- Header/Navigation - *Top Level*

    - The navigation menu will be a hamburger/bars menu icon regardless of screen size, this will also be fixed in the top right corner allowing the user to navigate regardless of their position on the page. 

    - The clicked navigation menu will open a full screen overlay that includes the navigation items on the right and the websites logo on the left. On small devices only the navigation links will be visible.

    - The header will also include a hero section split into two full height columns. One column which includes a hero image/slideshow and the other column will contain the logo, call to action text and a sign up button.

- Body - *Main Page Elements*

    - Firstly a combination of text content and images will be used to convey the about section.

    - Then the gallery will be a simple layout of two rows and three columns wide, on large screens, with a hover effect that displays information regarding the image using a coloured overlay.

    - The first element of the supper club page will be a search bar to allow users to find specific events.

    - Where the supper club events are listed the layout will be cards with interactive elements such as buttons, and input comment areas.

    - The pages specific to using forms will have minimal to none additional content in order for the forms to be the main focus point.

- Footer - *Bottom Level*

    - This will also contain navigation links to reduce user clicks when at the bottom of a page.

    - Social media links placed here to ensure the user does not navigate away from the page to soon.

    - Copyright and legal information placed here.
    
    - The websites logo to reinforce the users awareness of the company.

---

#### Wireframes

- [Desktop website view](#)

- [Tablet website view](#)

- [Mobile website view](#)

## Design

### Colour Scheme

- The colour scheme for this website contains three colours a main, secondary and accent colour. The primary and secondary colours are being used as they feature in the logo, and the accent colour which fits into the colour palette will be used as a contrast colour. These colours have been chosen as they create an effect of calming, fun/happy but will still look sleek, stylish and professional.

- Blue Sapphire (#075570) - Primary Colour - This very dark blue shade is the background colour of the websites logo and will be used throughout for certain background colours such as the navigation menu, and button colours. Blue which naturally has a calming effect, however, using this much darker tone creates a stylish, modern and luxurious effect.

- Blue Sapphire Dark (#06445a) - Primary Colour Dark - A slightly darkened version of the primary colour used throughout the site to help with accessability and readablity where needed.

- Golden Tainoi (#ffc145) - Secondary Colour - This colour is used for the outline of the logo and is a striking contrast the the Blue Sapphire primary colour, that pops out and is extremely aesthetically pleasing. Described as a light orange colour with yellow tones, this colour creates an emotion of happiness and joy something that goes hand in hand with the main purpose of supper clubs which is to bring people together.

- Golden Tainoi Dark (#cc9a37) - Secondary Colour Dark - A slightly darkened version of the secondary colour used throughout the site to help with accessability and readablity where needed.

- Sugar Cane (#f1f1e6) - Accent Colour - This colour will feature throughout the project as a neutral contrast colour to break up the bold colours of the primary and secondary. It will also be used as a background colour when the Blue Sapphire colour really needs to stand out to the user. Described as a light greyish yellow this colour fits in with the palette perfectly, it will never draw attention away from main colours and does exactly what an accent colour needs to.

- Soft Red (#f25c66) - Cancel/Delete Colour - Used as a warning indicator for the user whenever they are making ireversible changes such as deleting their account/events, or to display cancelling an action such as editing their profile/event.

### Typography

- There will be two fonts used throughout the website. The titles and main elements font will be Lora, and the accompanying body font will be Open Sans. Both fonts come from the Serif family, however Lora is a Serif specific so that will be used for the fall back font, whereas Open Sans will have the fallback of Sans-Serif.

- **Lora** - A calligraphy focused serif font which compliments the luxurious colours used as it's a elegant and stylish that stands out well when used with titles and main elements.

- **Open Sans** - A simple, easy to read font that compliments the bold strokes of Lora and works well as a body font. This font is described as friendly and neutral.

---

### Logo

- The logo for this project was generated through [Hatchful](https://hatchful.shopify.com/) for the initial design, I then customised the font and colours. As mentioned above I chose two striking and stand out colours for the logo. The font used is a Serif style font to match the Lora font that will be used for titles and main elements throughout the website. For the graphics in the design I decided that in order to immediately portray the focus of this website using something related was needed, this led to the decision to use a simple illustration of a knife and fork underneath the text. The design around the text is purely for aesthetic reasons however it does draw the users eye to the main focus point by acting as leading lines.

### Imagery

- Imagery for this website will mainly feature on the landing page in order to not only show visitors what this website's focus is and what other users use the platform for, but also to convey information about the concept. The images used will be of high, professional quality and will mainly be food focused photos but also with some candid imagery of people enjoying eating, drinking and conversing together in private spaces. These images especially will enhance the chance of converting visitors into users.

- Featuring minimally throughout the website will also be the use of icons. These will mainly be used in form sections to convey what a certain element is asking the user to input. For example when a user is creating an event in the section where they are asked for their menu the cutlery icon will be used here. This not only looks aesthetically pleasing but it will compliment the overall fun, enjoyable feeling conveyed from the website.

---

## Database Model

- This project uses [MongoDB](https://www.mongodb.com/) for all database aspects. MongoDB is a cross platform document-orientated database program. Classified as a NoSQL database program it uses JSON-like documents with optional schemas. 

- The main schema used in this project is ObjectId.
    - The objectId schema type provides 12-bit MongoDB-specific unique values that can be used as identifiers for objects.
    - This assigned to any document added to a collection in the database in order to manipulate it at a later date by searching the database by using the ObjectId.

- Below is the database diagram plan used for structuring the database in this project. 

![Database diagram chart](readme-screenshots/database-model.png)

As outlined above the three collections in this database are;

- Events - This is the most important as the entire platfrom is based around this functionality. 
    
    - Users create an event which is added into the database which stores the author in the event which is then related to the 'Users' collection.

    - When a user signs up for an event their email address is then added to this document in the form of an array (see screenshot below).

    ![Database document example](readme-screenshots/guest-email-db.png)

- Categories - Here all the categories available for the user are stored, these are displayed on the front end when creating/editing an event. Most importantly though this collection is used for searching through created events for specific categories.

- Users - All successful user registrations are stored here with passwords being securly stored by using Pythons Werkzeug Wecurity password hash. This generates a random character string that disguises the users password in the database, without affecting the password that they registered with.
