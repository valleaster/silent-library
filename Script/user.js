const errorMessage = document.getElementById('error-message');
const addBtn = document.getElementById('add');
const updateBtn = document.getElementById('update');

const usersName = document.getElementById('name');
const usersEmail = document.getElementById('email');
const usersRole = document.getElementById('role');
const fields = [usersName, usersEmail, usersRole];

let hasError = false;
let users = JSON.parse(localStorage.getItem('users')) || [];

// Form submission behavior
addBtn.addEventListener('click', e => {
    hasError = false;
    e.preventDefault();
    validateForm();

    const username = usersName.value.toLowerCase();
    const email = usersEmail.value.toLowerCase();
    const role = usersRole.value;

    // Checking for user existence 
    const existingUser = users.some(user => user.email === email);

    if(existingUser) {
        showError(usersEmail);
        errorMessage.textContent = 'Email already exists';
    };

    // Error handling
    if(!hasError) {
        users.push({ 
            name: username, 
            email: email, 
            role: role 
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        showData();
        clearForm();
    }
});

// Displaying error
function showError (element) {
    hasError = true;
    element.classList.add('error');
    errorMessage.style.visibility = 'visible';
    errorMessage.textContent = 'Please fill the required field';
}

// Input validation
function validateForm() {
    // Name error
    if (usersName.value === '') {
        showError(usersName);
    };

    // Email error
    if(usersEmail.value === '') {
        showError(usersEmail);
    } else if(!isValidEmail(usersEmail.value)) {
        showError(usersEmail);
        errorMessage.textContent = 'Please enter a valid email';
    };

    // Select role error
    if(usersRole.selectedIndex === 0) {
        showError(usersRole);
    };
};

// Email validation
function isValidEmail(mail) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(mail).toLowerCase());
};

// Show local storage data on page
function showData() {
    if(localStorage.getItem('users') == null) {
        users = [];
    } else{
        users = JSON.parse(localStorage.getItem('users'));
    };

    let html = '';

    users.forEach(function(element, index) {
        html += '<tr>';
        html += '<td class="capitalize">' + element.name + '</td>';
        html += '<td>' + element.email + '</td>';
        html += '<td class="capitalize">' + element.role + '</td>';
        html += 
            '<td class="action-btn"><button onclick="editData(' + index + ')" class="btn left-btn"><i class="fa-solid fa-pen-to-square"></i>Edit</button><button onclick="deleteData(' + index + ')" class="btn right-btn"><i class="fa-solid fa-trash"></i>Delete</button>'
        html += '</tr>';
    });

    document.querySelector('#table tbody').innerHTML = html;
};

document.onload = showData();

// Deleting data 
function deleteData(index) {
    if(localStorage.getItem('users') == null) {
        users = [];
    } else{
        users = JSON.parse(localStorage.getItem('users'));
    };

    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    showData();
};

// Edit data
function editData(index) {
    // Displaying update button and hiding add user button
    addBtn.style.display = 'none';
    updateBtn.style.display = 'block';

    if(localStorage.getItem('users') == null) {
        users = [];
    } else{
        users = JSON.parse(localStorage.getItem('users'));
    };

    // Auto populate form
    usersName.value = users[index].name;
    usersEmail.value = users[index].email;
    usersRole.value = users[index].role;

    updateBtn.addEventListener('click', e => {
        hasError = false;
        e.preventDefault();
        validateForm();

        if(!hasError) {
            // Updating values in local storage
            users[index].name = usersName.value;
            users[index].email = usersEmail.value;
            users[index].role = usersRole.value;

            localStorage.setItem('users', JSON.stringify(users));
            showData();
            clearForm();

            // Hiding update button and displaying add user button
            addBtn.style.display = 'block';
            updateBtn.style.display = 'none';
        }
    })
};

// Clear form
function clearForm() {
    usersName.value = '';
    usersEmail.value = '';
    usersRole.selectedIndex = 0;
};

fields.forEach((field) => {
    field.addEventListener('input', () => {  
        if (field.classList.contains('error')) {
            field.classList.remove('error');
            errorMessage.textContent = '';
        };
    });
});