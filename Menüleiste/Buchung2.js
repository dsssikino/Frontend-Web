
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
var amountValue
// Define the base URL for your FastAPI server
const baseUrl = 'https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io';

document.addEventListener("DOMContentLoaded", function() {
  var urlParams = new URLSearchParams(window.location.search);
  amountValue = urlParams.get('amount');
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

 function fetchFilme(FilmID, vorstID){
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
         fetchVorst(vorstID);
     }
  )
  .catch(error => console.log('Fehler bei der API-Anfrage:', error));
    })
}

function fetchVorst(vorstID){
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
   datenAusgabeZus();
  })

  .catch(error => {
    console.log('Fehler beim Abrufen der Daten:', error);
});
  })
}
function fetchBuchungID(){    

    return fetch("https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io//bookings/show/"+ vorstID+"/user/3/")
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log("Abfrage für Buchungsid gesendet.");
        var element = document.getElementById("buchungsid");
        element.innerHTML = result;
        return result;

      })
      .catch(error => {
        console.log('error', error);
        throw error;
      });
}
function fetchAndDisplayImage(titel) {
  const imageElement = document.getElementById("filmfilmbild"); // Das vorhandene img-Element
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
    .catch(error => console.log('Fehler:', error));
}
function datenAusgabeZus(){
    fetchBuchungID();
    for (var i = 0; i < gebuchteSitzeDaten.length; i++) {
      var daten = gebuchteSitzeDaten[i];
      console.log("Die Buchung enthält folgende Daten: "+ titel+ "Am Tag und zur Zeit:"+ datum+ uhrzeit+  ", IdSitz: " + daten.IdSitz + ", kategorie: " + daten.kategorie);
      var test = document.getElementById('buchungszusamfas');
      test.innerHTML += `<div>
      <table align="center">
    <tr>
    
      <td>Film: </td>
      <td>Tag: </td>
      <td>Uhrzeit: </td>
      <td>Sitzplatz: </td>
      
    </tr>
    <tr>
      <td>${titel}</td>
      <td>${datum}</td>
      <td>${uhrzeit}</td>
      <td>${daten.IdSitz}</td>
      
    </tr>
  </table>
      </div>`;
      fetchAndDisplayImage(titel);
      var element2 = document.getElementById("gesamtpreis");
      element2.innerHTML= amountValue;
      //preisBestimmung();
      /*var katcode = daten.kategorie.substring(0, 3);
      console.log("die Kategorie eines sitzes ist: " + katcode);
      if (katcode == "erw") {
        console.log("erwachsenerticketpreis " + erwachsene + " " + i);
      } else if (katcode == "erm") {
        console.log("ermäßigtticketpreis " + ermaßigt + " " + i);
      } else if (katcode == "Kin") {
        console.log("Kinderticketpreis " + kinder + " " + i);
      }
      else console.log("Fehler");*/
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
  