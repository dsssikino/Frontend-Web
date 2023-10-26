/* Account fenster login und registrierung */
/*
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
*/
  function generateOutput() {


    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const strasse = document.getElementById('strasse').value;
    const hausnr = document.getElementById('hausnr').value;
    const plz = document.getElementById('plz').value;
    const ort = document.getElementById('ort').value;
    const email = document.getElementById('email').value;
    const geburtstag = document.getElementById('geburtstag').value;
    const benutzername = document.getElementById('benutzername').value;
    const password = document.getElementById('password').value;
    const telefonnummer = document.getElementById('telefonnummer').value;


    
    const filmInfo1 = "https://dsssi-backend-user.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/create?username="+benutzername +"&passwort="+ password +"&email="+ email +"&geburtsdatum="+ geburtstag+"&vorname="+firstname +"&nachname="+lastname+"&wohnort="+ort+"&postleitzahl="+plz+"&telefonnummer="+telefonnummer+"&bezahlmethode=paypal&benutzerid=344468&hausnummer="+hausnr+"&strasse="+strasse+"";
  
  
    console.log(filmInfo1);
    //sendAPIRequest(filmInfo1);
  
  }
 

  function sendAPIRequest(data) {
    console.log(data);
    var raw = "";
    var requestOptions = {
      method: 'POST',
      body: 'raw',
      redirect: 'follow'
    };
    console.log(data);
    fetch(data, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      
        
      })
      .catch(error => console.log('Fehler:', error));
    } 

  
    function seitenwechsel(){
      window.location.href = "AccountLogin.html";
    }