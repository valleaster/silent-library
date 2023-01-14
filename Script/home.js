$(document).ready(function(){
    const userRole = localStorage.getItem('role');
    
    if(userRole === 'admin' || userRole === 'user') {
       $('#button').html('Read Now');
       $('#button').click(() => {
         window.location.href = 'books.html';
       });
    } else {
       $('#button').text('Sign up now');
       $('#button').click(() => {
         window.location.href = 'register.html';
       });
    };
});