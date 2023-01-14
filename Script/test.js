$(document).ready(function(){
    const userRole = sessionStorage.getItem('role');
    const userName = localStorage.getItem('name');

    if (userRole === 'user') {
      $('#header').load("header-member.html");
    } else {
      $('#header').load("header-visitor.html");
      // for testing purposes
      sessionStorage.setItem('name', 'meow');
      sessionStorage.setItem('role', 'visitor');
    }

    // Not working starts
    $('#username').html(userName);

    $('#dropdown-menu').hide();

    $('#profile').click(() => {
        $('#dropdown-menu').show();
    }).mouseleave(() => {
        $('#dropdown-menu').hide();
    });

    $('#redirect').click(() => {
        alert('you are going to be redirected..');
        // window.location.href = '../Pages/user-management.html';
    })

    $('#logout').click(() => {
      alert('you are clicking logout button');
      sessionStorage.clear();
    });
    // End of not working

    $('#footer').load("footer.html");
});