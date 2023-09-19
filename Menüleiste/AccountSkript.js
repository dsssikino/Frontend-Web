/* Account fenster login und registrierung */
document.getElementById('registerLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  });
  
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
    // Hier kannst du den Code einfügen, um den neuen Benutzer zu registrieren
    console.log('Registrierung:', newUsername, newPassword);
  });
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    // Hier kannst du den Code einfügen, um den Benutzer anzumelden
    console.log('Anmeldung:', username, password);
  });