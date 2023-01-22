$(document).ready(function(){
    $('#header').load("header-signxx.html");
});

// Showing password
function showPassword() {
    let button = this;
    let target = button.getAttribute('data-target');
    let x = document.getElementById(target);
    if (x.type === "password") {
        x.type = "text";
        button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        x.type = "password";
        button.innerHTML = '<i class="fa-solid fa-eye"></i>';
    };
};

document.querySelectorAll('.show-password').forEach((button) => {
    button.addEventListener('click', showPassword);
});