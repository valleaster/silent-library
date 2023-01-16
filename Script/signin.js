const form = document.querySelector('form');
const errorMessage = document.querySelector('.error-message');
const email = document.getElementById('email');
const password = document.getElementById('password');
const fields = [email, password];

let registered = JSON.parse(localStorage.getItem('registered'));

let hasError = false;
let fieldEmpty = true;

// Form submission logic
form.addEventListener('submit', e => {
    e.preventDefault();
    hasError = false;
    validateForm();
    if (!hasError) {
        getUserData(email.value);
        clearForm();
        window.location.href = '../Pages/home.html';
    } else{
        // Removing error message
        fields.forEach((field) => {
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    field.classList.remove('error');
                    errorMessage.textContent = '';
                };
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
    if ((!fieldEmpty) && !registered.some(user => user.email === emailValue && user.password === passwordValue)) {
        showError('User does not exist');
    } else if(registered.some(user => user.email === emailValue) && !registered.some(user => user.password === passwordValue)) {
        showError('Email or password incorrect');
    } else if(!registered.some(user => user.email === emailValue) && registered.some(user => user.password === passwordValue)) {
        showError('Email or password incorrect');
    };
};

// Clear form
function clearForm() {
    fields.forEach((input) => {
        input.value = '';
    });
};

// Storing session data
function getUserData(mail) {
    const user = registered.find(user => user.email === mail);
    if(user) {
        sessionStorage.setItem('name', user.name);
        sessionStorage.setItem('role', user.role);
    }
}

