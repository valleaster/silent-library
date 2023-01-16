$(document).ready(function(){
    const userRole = sessionStorage.getItem('role');
    const userName = sessionStorage.getItem('name');

    // Showing header based on user role
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

    //Member headers dropdown menu
    function onHeaderLoad() {

      // Display username on profile
      $('#profile-name').html(userName);

      //Show dropdown when profile clicked
      $('#profile').click(() => {
          $('#dropdown-menu').toggleClass('hide');
      });

      // Redirecting to user management page
      $('#redirect').click(() => {
          window.location.href = '../Pages/user.html';
      });

      //logout button clicked
      $('#logout').click(() => {
          sessionStorage.clear();
          location.reload(true);
      });
    };

    $('#footer').load("footer.html");
});