// Display different button based on user role
$(document).ready(function(){
    const userRole = sessionStorage.getItem('role');
    
    if(userRole === 'admin' || userRole === 'user') {
       $('#first-btn').html('Read Now');
       $('#first-btn').click(() => {
         window.location.href = 'books.html';
       });
    } else {
       $('#first-btn').text('Sign up now');
       $('#first-btn').click(() => {
         window.location.href = 'register.html';
       });
    };

    $('#second-btn').click(() => {
      window.location.href = 'contact.html';
      sessionStorage.setItem('autoPopulate', 'true');
    })
});