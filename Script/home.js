// Display different button based on user role
$(document).ready(function(){
    const userRole = sessionStorage.getItem('role');
    
    // Load text content and link based on user access
    if(userRole === 'admin' || userRole === 'user') {
       $('#first-btn').text('Read Now');
       $('#first-btn').click(() => {
         window.location.href = 'books.html';
       });
    } else {
       $('#first-btn').text('Sign up now');
       $('#first-btn').click(() => {
         window.location.href = 'register.html';
       });
    };

    // Set button link trigger flag to auto-populate enquiry form
    $('#second-btn').click(() => {
      window.location.href = 'contact.html';
      sessionStorage.setItem('autoPopulate', 'true');
    })
});