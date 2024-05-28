var users = [
    { username: 'evandro@gmail.com', password: 'evandro123' },
    { username: 'kleber@gmail.com', password: 'kleber123' },
    { username: 'admin@gmail.com', password: 'admin' }
  ];

  var loginForm = document.getElementById('login-form');
  var userTable = document.getElementById('userTable');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('input-usuario').value;
    var password = document.getElementById('input-senha').value;
    var authenticatedUser = users.find(function(user) {
      return user.username === username && user.password === password;
    });
    if (authenticatedUser) {
      if (authenticatedUser.username === 'admin@gmail.com') {
        window.location.href = '../dashboard/dashboard.html';
      }
      else {
        window.location.href = '../coleta/coleta.html';
      }
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });