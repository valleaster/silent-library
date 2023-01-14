$(document).ready(function(){
    const userRole = sessionStorage.getItem('role');
    const userName = sessionStorage.getItem('name');

    if (userRole === 'admin') {
      $('#header').load("header-admin.html", onHeaderLoad);
    } else if (userRole === 'user') {
      $('#header').load("header-member.html", onHeaderLoad);
    } else {
      $('#header').load("header-visitor.html");
      // for testing purposes
      sessionStorage.setItem('name', 'meow');
      sessionStorage.setItem('role', 'visitor');
    }

    //member header related UI stuff: called when header loaded
    function onHeaderLoad() {

      // Display username on profile
      $('#username').html(userName);

      //Show dropdown when profile clicked
      $('#profile').click(() => {
          $('#dropdown-menu').toggleClass('hide');
      });

      $('#redirect').click(() => {
        window.location.href = '../Pages/user-management.html';
      });

      //logout button clicked
      $('#logout').click(() => {
          sessionStorage.clear();
      });
    };

    $('#footer').load("footer.html");
});