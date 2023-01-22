const form = document.querySelector('form');
const errorMessage = document.querySelector('.error-message');
const email = document.getElementById('email');
const password = document.getElementById('password');
const fields = [email, password];

// Checking for data
let users;
if (localStorage.getItem('users') === null) {
    const testUsers = [
        {name: 'yanfei', email: 'feifei@mail.com', password: '12345678', role: 'user'},
        {name: 'lisa', email: 'lisaminci@silentlibrary.com', password: '12345678', role: 'admin'}
    ];

    localStorage.setItem('users', JSON.stringify(testUsers));
    
} else {
    users = JSON.parse(localStorage.getItem('users'));
};

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
    };
});

// Displaying error message 
function showError(message) {
    hasError = true;
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
    email.classList.add('error');
    password.classList.add('error');
};

// Form validation
function validateForm() {

    const emailValue = email.value;
    const passwordValue = password.value;

    // Checking for empty fields
    if(emailValue === '' || passwordValue === '') {
        showError('Please fill in the form');
    } else{
        fieldEmpty = false;
    }

    // Checking for user existence
    if ((!fieldEmpty) && !users.some(user => user.email === emailValue)) {
        showError('User does not exist');
    } else if ((!fieldEmpty) && users.some(user => user.email === emailValue) && !users.some(user => user.password === passwordValue)) {
        showError('Password incorrect');
        email.classList.remove('error');
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
    const user = users.find(user => user.email === mail);
    if(user) {
        sessionStorage.setItem('name', user.name);
        sessionStorage.setItem('role', user.role);
    };
};

// Removing error message
fields.forEach((field) => {
    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            field.classList.remove('error');
            errorMessage.textContent = '';
        };
    });
});
