// Display different button based on user role
$(document).ready(function(){
    const populate = sessionStorage.getItem('autoPopulate');
    
    if(populate === 'true') {
       $('#subject').val('Color Run');

        const message = "Hi, I'm interested to join the upcoming Silent Library Color Run and here are my details: \n \nName: \nContact No.: \nVaccination Status: "

       $('#message').val(message)
    } 
});