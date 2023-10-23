//const axios = require('axios');
//const fs = require('fs');
var film;
var titel;
var genre;
var fsk;
var dauer;
var erwachsene;
var ermaßigt;
var kinder;
var kategorie;
var trailerURL;

var filmTitelVorst;
var uhrzeit;
var datum;
var vorstellungen = [];
var gebuchteSitzeDaten = [];

// Define the base URL for your FastAPI server
const baseUrl = 'https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io';

document.addEventListener("DOMContentLoaded", function() {
   gebuchteSitzeDaten = JSON.parse(localStorage.getItem('gebuchteSitze'));
  console.log("test: "+gebuchteSitzeDaten);
  if (gebuchteSitzeDaten) {
    // Weitere Verarbeitung der Daten
    for (var i = 0; i < gebuchteSitzeDaten.length; i++) {
      var daten = gebuchteSitzeDaten[i];
      console.log("IdFilm: " + daten.IdFilm + ", IdVorst: " + daten.IdVorst + ", IdSitz: " + daten.IdSitz);
    }
  } else {
    console.log("Keine gespeicherten Daten gefunden.");
  }
  var FilmID = gebuchteSitzeDaten[0].IdFilm;
  var vorstID = gebuchteSitzeDaten[0].IdVorst;

  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
  .then(response => response.text()) // Ändern Sie .json() auf .text(), da die API eine Textantwort sendet
  .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      const filmText = data;
      const filme = filmText.match(/Film{[^}]+}/g);

         film = filme[FilmID];
         titel = film.match(/titel='([^']+)'/)[1];
         genre = film.match(/genre='([^']+)'/)[1];
         fsk = film.match(/fsk=(\d+)/)[1];
         dauer = film.match(/dauer=(\d+)/)[1];
         erwachsene = film.match(/erwachsene=(\d+)/)[1];
         ermaßigt = film.match(/ermaessigt=(\d+)/)[1];
         kinder = film.match(/kinder=(\d+)/)[1];
         kategorie = film.match(/kategorie='([^']+)'/)[1];
         trailerURL = film.match(/trailerURL='([^']+)'/)[1];
         var Titel = document.getElementById("aktuellerTitel");
     }
  )
  .catch(error => console.error('Fehler bei der API-Anfrage:', error));

  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungAnzeigen')
  .then(response => response.text())
  .then(data => {
   const vorstellungen = data.match(/Vorstellung{[^}]+}/g);

    var vorstellung = vorstellungen[vorstID];
    filmTitelVorst = vorstellung.match(/filmTitel='([^']+)'/)[1];
    uhrzeit = vorstellung.match(/zeit=([^']+)/)[1];
    datum = vorstellung.match(/datum=([^']+)/)[1];

    //const kinosaal = vorstellung.match(/kinosaal=(\d+)/);
  
  })

  .catch(error => {
    console.log('Fehler beim Abrufen der Daten:', error);
});
  datenAusgabe();
});

function datenAusgabe(){
  for (var i = 0; i < gebuchteSitzeDaten.length; i++) {
    var daten = gebuchteSitzeDaten[i];
    console.log("Die Buchung enthält folgende Daten: "+ titel+ "Am Tag und zur Zeit:"+ datum+ uhrzeit+  ", IdSitz: " + daten.IdSitz);
  }
}



 /* Navigation Buchung 3 */
 var button = document.getElementById("testBuchung");
  button.addEventListener("click", redirectToBuchung3);
/*
 function redirectToBuchung3() {
     // Create a new booking
  // Call the /hello endpoint
  // cancelBooking(1); // Cancel a booking with the specified ID
    createBooking(); // Create a new booking
    payBooking(25);
    window.location.href = "Buchung3.html";
 // Pay for a booking with the specified ID
// validateBooking(1); // Validate a booking with the specified ID

  } 
 
  // Function to create a booking
async function createBooking() {
  try {
    const response = await axios.post(`${baseUrl}/bookings/`, {
      show_id: 1, // Replace with your booking data
      customer_id: 1, // Replace with your booking data
      seats: 'A1,A2', // Replace with your booking data
      amount: 100, // Replace with your booking data
    });

    console.log('Booking created:', response.data["id"]);
  } catch (error) {
    console.error('Error creating booking:', error.response.data);
  }
}

// Function to call the /hello endpoint
async function sayHello() {
  try {
    const response = await axios.get(`${baseUrl}/hello`);

    console.log('Hello from server:', response.data);
  } catch (error) {
    console.error('Error calling /hello endpoint:', error.response.data);
  }
}

// Function to cancel a booking
async function cancelBooking(bookingId) {
  try {
    const response = await axios.delete(`${baseUrl}/bookings/${bookingId}/`);

    console.log('Booking canceled:', response.data);
  } catch (error) {
    console.error('Error canceling booking:', error.response.data);
  }
}

// Function to pay for a booking
async function payBooking(bookingId) {
  // Send a PUT request to the pay_booking endpoint with responseType: 'arraybuffer'
  axios.put(`${baseUrl}/bookings/${bookingId}/pay/`, null, {
    responseType: 'arraybuffer'
  })
    .then(response => {
      // Check the response status code
      if (response.status === 200) {
        console.log("Payment successful. PDF file downloaded.");
        // You can save the PDF file here if needed
        fs.writeFileSync("invoice.pdf", Buffer.from(response.data));
      } else {
        console.log(`Payment failed. Status code: ${response.status}`);
        console.log(response.data);  // Print the response content for debugging
      }
    })
    .catch(error => {
      console.error("Error making the request:", error);
    });
}

// Function to validate a booking
async function validateBooking(bookingId) {
  try {
    const response = await axios.put(`${baseUrl}/bookings/${bookingId}/validate/`);

    console.log('Booking validated:', response.data);
  } catch (error) {
    console.error('Error validating booking:', error.response.data);
  }
}
*/
