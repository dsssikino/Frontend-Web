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
var kategorie;
var FilmID;
var vorstID;
// Define the base URL for your FastAPI server
const baseUrl = 'https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io';

document.addEventListener("DOMContentLoaded", function() {
  gebuchteSitzeDaten = JSON.parse(localStorage.getItem('gebuchteSitze'));
 console.log("test: "+gebuchteSitzeDaten);
 if (gebuchteSitzeDaten) {
   // Weitere Verarbeitung der Daten
   for (var i = 0; i < gebuchteSitzeDaten.length; i++) {
     var daten = gebuchteSitzeDaten[i];
     console.log("IdFilm: " + daten.IdFilm + ", IdVorst: " + daten.IdVorst + ", IdSitz: " + daten.IdSitz + ", kategorie: " + daten.kategorie);
   }
 } else {
   console.log("Keine gespeicherten Daten gefunden.");
 }
  FilmID = gebuchteSitzeDaten[0].IdFilm;
  vorstID = gebuchteSitzeDaten[0].IdVorst;

 fetchFilme(FilmID, vorstID);

});

 function fetchFilme(FilmID, vorstID, titel, genre, fsk,dauer){
  setTimeout(() => {
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
         console.log("filme fetch");
         fetchVorst(vorstID, titel, genre, fsk,dauer);
     }
  )
  .catch(error => console.error('Fehler bei der API-Anfrage:', error));
    })
}
function datenFüllen(titel, genre, fsk,dauer){
  console.log("ich kenne diec daten, die ich brauche:"+ titel+genre);
  document.getElementById("titelBuchung2").innerHTML = titel;
  document.getElementById("genreBuchung2").innerHTML = genre;
  document.getElementById("fskBuchung2").innerHTML = fsk;
  document.getElementById("filmlangeBuchung2").innerHTML = dauer;
  fetchAndDisplayImage(titel, i);

}
function fetchAndDisplayImage(titel, i) {
  const imageElement = document.getElementById("PlakatBuchung2"); // Das vorhandene img-Element
  const imageUrl = "https://backendfiles.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/files/"+ titel+".jpg";

  fetch(imageUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen des Bildes');
      }
      return response.blob();
    })
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      imageElement.src = objectURL;
      console.log("Bild gefunden und wird dem film gegen.Für: "+ titel + "iD: "+ i+1);

    })
    .catch(error => console.error('Fehler:', error));
}
function fetchVorst(vorstID, titel, genre, fsk,dauer){
  setTimeout(() => {
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungAnzeigen')
  .then(response => response.text())
  .then(data => {
   const vorstellungen = data.match(/Vorstellung{[^}]+}/g);
   for (var z = 0; z < vorstellungen.length; z++){
    var vorstellung = vorstellungen[z];
    const sitzplan = vorstellung.match(/sitzplan=([^}]+)/);
    console.log(sitzplan[1]);
   if(sitzplan[1] == vorstID){
    console.log(vorstellungen);
    filmTitelVorst = vorstellung.match(/filmTitel='([^']+)'/)[1];
    uhrzeit = vorstellung.match(/zeit=([^,]+)/)[1];
    datum = vorstellung.match(/datum=([^,]+)/)[1];
    console.log("Die pasende Vorstellung wurde gefunden: "+ vorstID + " mit den Daten " +filmTitelVorst + uhrzeit + datum + kategorie);
   }
   }
   console.log("vorst fetch");
datenAusgabe(titel, genre, fsk,dauer);

  })

  .catch(error => {
    console.log('Fehler beim Abrufen der Daten:', error);
});
  })
}

/* Problem:je nach Film ist der eine oder andere fetch "schneller"-> teil Variablen sind 
dementsprechen für die datenÜbergabe unbekannt */

function datenAusgabe(titel, genre, fsk,dauer){
  
  for (var i = 0; i < gebuchteSitzeDaten.length; i++) {
    var daten = gebuchteSitzeDaten[i];
    console.log("Die Buchung enthält folgende Daten: "+ titel+ "Am Tag und zur Zeit:"+ datum+ uhrzeit+  ", IdSitz: " + daten.IdSitz + ", kategorie: " + daten.kategorie);
    var gewählteTicketsDiv = document.getElementById('gewählteTickets');
    gewählteTicketsDiv.innerHTML += `
    <div>
    
    <table align="center">
  <tr>
    <td>Tag: </td>
    <td>Uhrzeit: </td>
    <td>Sitzplatz: </td>
    <td>Preis: </td>
  </tr>
  <tr>
    <td>${datum}</td>
    <td>${uhrzeit}</td>
    <td>${daten.IdSitz}</td>
    <td><div id="einzelpreis${i}"></div></td>
  </tr>
 
</table>
    </div>
    `;
    datenFüllen(titel, genre, fsk,dauer);

    //preisBestimmung();
    var katcode = daten.kategorie.substring(0, 3);
    console.log("die Kategorie eines sitzes ist: " + katcode);
    if (katcode == "erw") {
      document.getElementById("einzelpreis"+i ).innerHTML = erwachsene + "€";
      console.log("erwachsenerticketpreis " + erwachsene + " " + i);
    } else if (katcode == "erm") {
      document.getElementById("einzelpreis"+i ).innerHTML = ermaßigt  + "€";
      console.log("ermäßigtticketpreis " + ermaßigt + " " + i);
    } else if (katcode == "Kin") {
      document.getElementById("einzelpreis"+i ).innerHTML = kinder + "€";
      console.log("Kinderticketpreis " + kinder + " " + i);
    }
    else console.log("Fehler");
  }
}
 function betraagSummieren(gebuchteSitzeDaten){
  
  var summe = 0;
  for(var e = 0; e <gebuchteSitzeDaten.length; e++){
    var katcode = gebuchteSitzeDaten[e].kategorie.substring(0, 3);
    console.log("die Kategorie eines sitzes ist: " + katcode);
    if (katcode == "erw") {
      summe = parseInt(summe) + parseInt(erwachsene);
      console.log("erwachsenerticketpreis " + erwachsene + " " + i);
    } else if (katcode == "erm") {
      console.log("ermäßigtticketpreis " + ermaßigt + " " + i);
      summe = parseInt(summe) + parseInt(ermaßigt);
    } else if (katcode == "Kin") {
      console.log("Kinderticketpreis " + kinder + " " + i);
      summe= parseInt(summe) + parseInt(kinder);
    }
    else console.log("Fehler");
  }
  console.log("Die Summe der Katenpreise ist: " + summe+ "länge des array" +gebuchteSitzeDaten.length );
  console.log("Hieri st die SUmme: " + summe );
  return parseInt(summe);
}
  var sitzeID=[];

function sitzArray(){
  for(var e = 0; e <gebuchteSitzeDaten.length; e++){
     sitzeID.push(gebuchteSitzeDaten[e].IdSitz);
  }
  return sitzeID;
}


  let transactionId2;
  async function generateKey() {

    const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

    const des = {
      "description": "neue_Buchung"
    };
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(des)
      });


      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Server responded with status:', response.status);
        return null;
      }
    } catch (error) {

      console.error('Error generating key:', error);
      return null;
    }
  }
  const showId = vorstID;
  const customerId = "3";
var amount;
  // Finde den Button anhand seiner ID.
  document.addEventListener('DOMContentLoaded', function() {
    // Dieser Code wird erst ausgeführt, wenn das HTML-Dokument vollständig geladen ist.
    
    const generateKeyButton = document.getElementById('generateKeyButton');
    
    generateKeyButton.addEventListener('click', () => {
       amount = betraagSummieren(gebuchteSitzeDaten);
      const seats = sitzArray();

      parseInt(amount);
      console.log("Ich kenne die FilmId"+ vorstID+ "ich kenne die summe auch:"+ amount);
      generateKey()
        .then(data => {
          if (data) {
            console.log('Generated keys:', data.key);
            transactionId2 = data.key;
            sendBookingRequest(transactionId2,vorstID, customerId, seats, amount);

          }
        });

    });
    
  });
  function datenladen(){
    for (var i = 0; i < gebuchteSitzeDaten.length; i++) {
      var daten = gebuchteSitzeDaten[i];
      console.log("Die Buchung enthält folgende Daten: "+ titel+ "Am Tag und zur Zeit:"+ datum+ uhrzeit+  ", IdSitz: " + daten.IdSitz + ", kategorie: " + daten.kategorie);
      var zusammenfass = document.getElementById('gewählteTickets');
      zusammenfass.innerHTML += `
      test
      `;
      //preisBestimmung();
      var katcode = daten.kategorie.substring(0, 3);
      console.log("die Kategorie eines sitzes ist: " + katcode);
      if (katcode == "erw") {
        document.getElementById("einzelpreis"+i ).innerHTML = erwachsene + "€";
        console.log("erwachsenerticketpreis " + erwachsene + " " + i);
      } else if (katcode == "erm") {
        document.getElementById("einzelpreis"+i ).innerHTML = ermaßigt  + "€";
        console.log("ermäßigtticketpreis " + ermaßigt + " " + i);
      } else if (katcode == "Kin") {
        document.getElementById("einzelpreis"+i ).innerHTML = kinder + "€";
        console.log("Kinderticketpreis " + kinder + " " + i);
      }
      else console.log("Fehler");
    }
  }
  function sendBookingRequest(transaction,showId, customerId, seats, amount) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "transaction_id": transaction,
      "show_id": showId,
      "customer_id": customerId,
      "seats": seats,
      "amount": amount
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch("https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/new", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log("buchung gesendet");
        zusammenfass();
        return result;

      })
      .catch(error => {
        console.log('error', error);
        throw error;
      });

  }

function zusammenfass(){
  window.location.href = "Buchung3.html?amount="+ amount;
  
  
}




/*
 function preisBestimmung(){
  for (var a = 0; a < gebuchteSitzeDaten.length; a++) {
      var button = gebuchteSitzeDaten[a].kategorie;
      var id = button.id;
      var kategorie = id.substring(0, 3);
  
      if (kategorie == "erw") {
        document.getElementById("ticketPreisEinz" + i).innerHTML = erwachsene + "€";
        console.log("erwachsenerticketpreis " + erwachsene + " " + i);
      } else if (kategorie == "erm") {
        document.getElementById("ticketPreisEinz" + i).innerHTML = ermaßigt  + "€";
        console.log("ermäßigtticketpreis " + ermaßigt + " " + i);
      } else if (kategorie == "Kin") {
        document.getElementById("ticketPreisEinz" + i).innerHTML = kinder + "€";
        console.log("Kinderticketpreis " + kinder + " " + i);
      }
      else console.log("Fehler");
    }
 }
*/

 /* Navigation Buchung 3 */
 //var button = document.getElementById("testBuchung");
 // button.addEventListener("click", redirectToBuchung3);
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
