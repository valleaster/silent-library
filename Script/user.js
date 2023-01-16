const form = document.querySelector('form');
const formName = document.getElementById('form-name');
const userEmail = document.getElementById('form-email');
const userRole = document.getElementById('form-role');
const fields = [formName, userEmail, userRole];

let hasError = false;
let editMode = false;
let users = JSON.parse(localStorage.getItem('users')) || [];

form.addEventListener('submit', e => {
    hasError = false;
    e.preventDefault();
    validateForm();

    const username = formName.value.toLowerCase();
    const email = userEmail.value.toLowerCase();
    const role = userRole.value;

    // Checking for duplicate users
    const existingUser = users.some(user => user.username === username && user.email === email || user.email === email);

    if(existingUser) {
        showError(formName, 'User already exists');
        showError(userEmail, 'User already exists');
    } else if(!hasError) {
        users.push({ username, email, role });
        localStorage.setItem('users', JSON.stringify(users));
    
        addUser(username, email, role); 
    }

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

});

// Displaying error
function showError (element, message) {
    const errorMessage = element.parentNode.querySelector('.error-message');    

    hasError = true;
    element.classList.add('error');
    element.classList.remove('no-error');
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}

// Input validation
function validateForm() {

    // Name error
    if (formName.value === '') {
        showError(formName, 'Name is required');
    };

    // Email error
    if(userEmail.value === '') {
        showError(userEmail, 'Email is required');
    } else if(!isValidEmail(userEmail.value)) {
        showError(userEmail, 'Please enter a valid email');
    };

    // Select role error
    if(userRole.selectedIndex === 0) {
        showError(userRole, 'Role is required')
    };
}

// Email validation
function isValidEmail(mail) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(mail).toLowerCase());
};

// Adding users to table
function addUser(names, emails, roles) {
    const initialButtons =
    `<ul>
        <li class="left-btn btn edit"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
        <li class="right-btn btn delete"><i class="fa-solid fa-trash"></i>Delete</li>
    </ul>`;

    const editmodeButtons = 
    `<ul>
        <li class="left-btn btn update"><i class="fa-solid fa-check"></i>Update</li>
        <li class="right-btn btn cancel"><i class="fa-solid fa-xmark"></i>Cancel</li>
    </ul>`;

    const table = document.querySelector('table');

    // Checking for tbody element
    let tableBody = table.querySelector('tbody');
    if (!tableBody) {
        tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
    };

    const newRow = document.createElement('tr');

    // Creating table data for each input and action buttons
    const nameData = document.createElement('td');
    nameData.innerHTML = `<input type="text" class="table-data long capitalize" value="${names}" readonly>`;

    const emailData = document.createElement('td');
    emailData.innerHTML = `<input type="text" class="table-data longer lowercase" value="${emails}" readonly>`;

    const roleData = document.createElement('td');
    roleData.textContent = roles;
    roleData.classList.add('capitalize');

    const actionData = document.createElement('td');
    actionData.classList.add('action');
    actionData.innerHTML = initialButtons;

    // Adding new table data elements to the new row
    newRow.appendChild(nameData);
    newRow.appendChild(emailData);
    newRow.appendChild(roleData);
    newRow.appendChild(actionData);

    // Adding new row to table body
    tableBody.appendChild(newRow);

    // Clearing form after adding new row
    clearForm();

    let initialName, initialEmail, initialRole;

    // Edit button function
    const edit = actionData.querySelector('.edit');
    edit.addEventListener('click', () => {
        editMode = true;

        // Storing initial state
        initialName = nameData.querySelector('input').value;
        initialEmail = emailData.querySelector('input').value;
        initialRole = roleData.textContent;

        // Changes to table row
        nameData.querySelector('input').classList.add('edit-mode');
        nameData.querySelector('input').removeAttribute('readonly');

        emailData.querySelector('input').classList.add('edit-mode');
        emailData.querySelector('input').removeAttribute('readonly');

        roleData.innerHTML = 
        `<select class="table-data edit-mode shorter" id="user-role">
            <option value="user" ${roles === 'user' ? 'selected' : ''}>User</option>
            <option value="admin" ${roles === 'admin' ? 'selected' : ''}>Admin</option>
        </select>`;

        actionData.innerHTML = editmodeButtons;
    });

    // Delete button function
    const del = actionData.querySelector('.delete');
    del.addEventListener('click', () => {
        // Deleting user data from local storage
        let currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        const index = currentUsers.findIndex(user => user.name === names && user.email === emails);
        users.splice(index, 1);

        localStorage.setItem('users', JSON.stringify(users));

        // Deleting user from table row
        const delTR = del.closest('tr');
        delTR.remove();
    });

    // Editing mode buttons
    if(editMode) {
        // Update button function
        const update = actionData.querySelector('.update');
        update.addEventListener('click', () => {
            const updatedName = nameData.querySelector('input').value;
            const updatedEmail = emailData.querySelector('input').value;
            const updatedRole = roleData.querySelector('select').value;
            // Updating user data in local storage
            users = users.map(user => {
                if(user.username === names) {
                    user.username = updatedName;
                    user.email = updatedEmail;
                    user.role = updatedRole;
                }
                return user;
            });
    
            localStorage.setItem('users', JSON.stringify(users));
            
            // Changing back to initial state
            nameData.querySelector('input').classList.remove('edit-mode');
            nameData.querySelector('input').setAttribute('readonly');
    
            emailData.querySelector('input').classList.add('edit-mode');
            emailData.querySelector('input').setAttribute('readonly');
    
            roleData.innerHTML = updatedRole;
            actionData.innerHTML = initialButtons;

            editMode = false;
        });

        // Cancel button function
        const cancel = actionData.querySelector('.cancel');
        cancel.addEventListener('click', () => {
            nameData.querySelector('input').value = initialName;
            emailData.querySelector('input').value = initialEmail;
            roleData.innerHTML = initialRole;
            actionData.innerHTML = editmodeButtons;
            editMode = false;
        });
    };
};

// Clear form
function clearForm() {
    formName.value = '';
    userEmail.value = '';
    userRole.selectedIndex = 0;
};