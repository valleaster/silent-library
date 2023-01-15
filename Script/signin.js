const form = document.querySelector('form');
const errorMessage = document.querySelector('.error-message');
const email = document.getElementById('email');
const password = document.getElementById('password');
const fields = [email, password];

const userEmail = localStorage.getItem('email');
const userPassword = localStorage.getItem('password');
const userRole = localStorage.getItem('role');

let hasError = false;
let fieldEmpty = true;

form.addEventListener('submit', e => {
    e.preventDefault();
    hasError = false;
    validateForm();
    if (!hasError) {
        clearForm();
        window.location.href = '../Pages/home.html';
    } else{
        // Removing error message
        fields.forEach((field) => {
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    field.classList.remove('error');
                    errorMessage.textContent = '';
                }
            });
        });
    };
});

// Displaying error message 
function showError(message) {
    hasError = true;
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
};

// Form validation
function validateForm() {

    const emailValue = email.value;
    const passwordValue = password.value;

    // Checking for empty fields
    if(emailValue === '' && passwordValue === '') {
        showError('Please fill in the form');
        email.classList.add('error');
        password.classList.add('error');
    } else{
        fieldEmpty = false;
    }

    // Checking for user existence
    if ((!fieldEmpty) && emailValue !== userEmail && passwordValue !== userPassword) {
        showError('User does not exist');
    } else if(emailValue === userEmail && passwordValue !== userPassword) {
        showError('Email or password incorrect');
    } else if(emailValue !== userEmail && passwordValue === userPassword) {
        showError('Email or password incorrect');
    };
}

// Clear form
function clearForm() {
    fields.forEach((input) => {
        input.value = '';
    });
};

