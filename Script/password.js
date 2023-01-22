$(document).ready(function(){
    let userPassword = '';
    let passwordValid = false;

    // Displaying real time password validation system
    $('#password').focus(function() {
        $(this).removeClass('no-error');
        $('#password-validation').css('display', 'block');

        if (userPassword !== ''){
            $('#prompt').css('display', 'none');
        } else {
            $('#prompt').css('display', 'block');
            $('#indicator').css('display', 'none');
        };
    });

    // Real time validation logic
    $('#password').on('keyup keydown', function() {
        $('#prompt').css('display', 'none');
        $('#indicator').css('display', 'block');
        userPassword = $(this).val();

        if (userPassword === '') {
            if($('.invalid').hasClass('active')) {
                $('.invalid').removeClass('active');
            } else if ($('.valid').hasClass('active')) {
                $('.invalid').removeClass('inactive');
                $('.valid').removeClass('active');
            };

            $('#prompt').css('display', 'block');
            $('#indicator').css('display', 'none');

        } else if (userPassword.length < 8) {
            $('#indicator').text('Password length is less than 8 characters');

            if($('.valid').hasClass('active')){
                $('.valid').removeClass('active');
                $('.invalid').removeClass('inactive');
                $('#indicator').removeClass('good');
            };

            $('.invalid').addClass('active');
            $('#indicator').addClass('weak');
            passwordValid = false;

        } else {
            $('.invalid').removeClass('active');
            $('.invalid').addClass('inactive');
            $('.valid').addClass('active');
            $('#indicator').addClass('good');
            $('#indicator').text('Password length is more than 8 characters');
            passwordValid = true;
        };
    });

    // Removing validation display
    $('#password').blur(function() {
        $('#password-validation').css('display', 'none');
        userPassword = $(this).val();

        if(passwordValid) {
            $(this).addClass('no-error');
        } else {
            // Adding message when password is invalid
            $(this).addClass('error');
            $('#password-error').css('display', 'block');

            if (userPassword === '') {
                $('#password-error').text('Please enter a password');
            } else {
                $('#password-error').text('Please enter a valid password');
            }
        };
    });
});