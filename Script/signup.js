const form = document.querySelector('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const fields = [username, email, password, confirmPassword];
const store = [username, email, password];

const headerMessage = document.getElementById('header-message');
const signUp = document.querySelector('.sign-up');

let hasError = false;
let totalError = 0;
let currentMargin = 0;
let screenWidth = window.innerWidth;

// Form submission logic
form.addEventListener('submit', e => {
    e.preventDefault();
    totalError = 0;
    validateForm();
    if (!hasError) {
        storeData();
        displayPopup(username);
        clearForm();
        hasError = false;
    } else {
        // Adjusting form margin
        currentMargin = totalError * 9;
        signUp.style.margin = getMarginValue();

        // Remove error message and readjust margin
        fields.forEach((field) => {
            field.addEventListener('input', () => {
                const errorMessage = field.parentNode.querySelector('.error-message');
        
                if(field.classList.contains('error')) {
                    field.classList.remove('error');
                    field.classList.add('no-error');
                    errorMessage.style.display = 'none';
                    errorMessage.textContent = '';

                    if(totalError > 0) {
                        totalError--;
                        currentMargin = currentMargin - 9;
                        signUp.style.margin = getMarginValue();
                    };
                };
            });
        });
    };
});

// Setting default data
if (localStorage.getItem('users') === null) {
    const testUsers = [
        {name: 'yanfei', email: 'feifei@mail.com', password: '12345678', role: 'user'},
        {name: 'lisa', email: 'lisaminci@silentlibrary.com', password: '12345678', role: 'admin'}
    ];

    localStorage.setItem('users', JSON.stringify(testUsers));
};

// Data storage 
function storeData() {
    const newUser = {
        'name' : username.value.toLowerCase(),
        'email' : email.value.toLowerCase(),
        'password': password.value,
        'role': userRole(email.value)
    };

    const registered = JSON.parse(localStorage.getItem('users'));
    registered.push(newUser);
    localStorage.setItem('users', JSON.stringify(registered));
};

// Displaying error
function showError (element, message) {
    const errorMessage = element.parentNode.querySelector('.error-message');    

    hasError = true;
    element.classList.add('error');
    element.classList.remove('no-error');
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
    totalError++;
};

// Form validation function
function validateForm() {
    const usernameValue = username.value;
    const emailValue = email.value.toLowerCase();
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    // Name error
    if(usernameValue === '') {
        showError(username, 'Name is required');
    };

    // Email error
    const registeredUser = JSON.parse(localStorage.getItem('users'))

    if(emailValue === '') {
        showError(email, 'Email is required');
    } else if(!isValidEmail(emailValue)) {
        showError(email, 'Please enter a valid email');
    } else if(registeredUser.some(user => user.email === emailValue)) {
        showError(email, 'Email is already in use');
    };

    // Password error
    if(passwordValue === '') {
        showError(password, 'Password is required');
    } else if(passwordValue.length < 8) {
        showError(password, 'Please enter a valid password');
    };

    // Confirm password error 
    if(confirmPasswordValue === '' && passwordValue === '') {
        showError(confirmPassword, 'Password is required');
    } else if(confirmPasswordValue === '' && passwordValue !== '') {
        showError(confirmPassword, 'Please confirm password');
    } else if((passwordValue.length < 8) && confirmPasswordValue === passwordValue){
        showError(confirmPassword, 'Please enter a valid password')
    } else if(confirmPasswordValue !== passwordValue) {
        showError(confirmPassword, 'Password mismatch');
    };
};

// Email validation
function isValidEmail(mail) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(mail).toLowerCase());
};

// Checking userRole
function userRole(mail) {
    if(mail.endsWith('@silentlibrary.com')) {
        return 'admin';
    } else {
        return 'user';
    }
};

// Getting margin value
function getMarginValue() {
    if(screenWidth < 1300) {
        return `calc(12vh - ${currentMargin}px) auto`;
    } else{
        return `calc(23vh - ${currentMargin}px) auto`;
    };
};

// Clearing form input fields
function clearForm() {
    fields.forEach((input) => {
        input.value = '';
    });
};