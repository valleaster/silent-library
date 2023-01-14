const page = document.getElementById('page');
const popup = document.getElementById('pop-up');
const close = document.getElementById('close');

// Displaying common popup
function displayPopup(nameInput) {
    popup.classList.add('active');
    page.classList.add('blur');
    headerMessage.textContent = nameInput.value + '!';
};

// Close popup
function closePopup() {
    popup.classList.remove('active');
    page.classList.remove('blur');
};

// Form submission behavior
function clearForm() {
    fields.forEach((input) => {
        input.value = '';
    });
};