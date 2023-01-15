// Form validation style and error message
const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const fields = [username, email, message];
const headerMessage = document.getElementById('header-message');

let hasError = false;

form.addEventListener('submit', e => {
    e.preventDefault();
    hasError = false;
    validateForm();
    if (!hasError) {
        displayPopup(username);
        clearForm();
    } else {
        // Removing error
        fields.forEach((field) => {
            field.addEventListener('input', () => {
                const errorMessage = field.parentNode.querySelector('.error-message');
        
                if (field.classList.contains('error')) {
                    field.classList.remove('error');
                    field.classList.add('no-error');
                    errorMessage.textContent = '';
                };
            });
        });
    };
});

// Displaying error
function showError (element, message) {
    const errorMessage = element.parentNode.querySelector('.error-message');

    hasError = true;
    element.classList.add('error');
    element.classList.remove('no-error');
    errorMessage.textContent = message
};

// Form validation function
function validateForm() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const messageValue = message.value;

    // Name error
    if(usernameValue === '') {
        showError(username, 'Name is required');
    };

    // Email error
    if(emailValue === '') {
        showError(email, 'Email is required');
    } else if(!isValidEmail(emailValue)) {
        showError(email, 'Please enter a valid email');
    };

    // Message error
    if(messageValue === '') {
        showError(message, 'Message is required');
    };
};

// Email validation
function isValidEmail(mail) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(mail).toLowerCase());
};
