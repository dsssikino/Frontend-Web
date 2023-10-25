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
var IDFIlm
var beschreibung;
var FilmID;
document.addEventListener("DOMContentLoaded", function() {
    // Code, der beim Laden der Seite ausgeführt werden soll
    var urlParams = new URLSearchParams(window.location.search);
     FilmID = urlParams.get('id') - 1;
    
    console.log("Die Seite wurde geladen!"+ FilmID);
    fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
  .then(response => response.text()) // Ändern Sie .json() auf .text(), da die API eine Textantwort sendet
  .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      console.log(data);
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
         beschreibung = film.match(/beschreibung='([^']+)'/)[1];
         trailerURL = film.match(/trailerURL='([^']+)'/)[1];
         

         ProgrammErstellung();
         fetchFunctionVorst( FilmID);
     }
  )
  .catch(error => console.log('Fehler bei der API-Anfrage:', error));
  
 
  
  }
  
  );
var filmTitelVorst;
var uhrzeit;
var datum;
var vorstellungen = [];
  function fetchFunctionVorst( FilmID){
  console.log("fetch Vorstellungen beginnt mit der FilID:" + FilmID);
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungAnzeigen')
    .then(response => response.text())
    .then(data => {
      console.log(data);
      console.log(titel);
    const vorstellungsText = data;
   var vorstellungen = data.match(/Vorstellung{[^}]+}/g);

    for (let y = 0; y < vorstellungen.length; y++) {
      var vorstellung = vorstellungen[y];
      filmTitelVorst = vorstellung.match(/filmTitel='([^']+)'/)[1];
      uhrzeit = vorstellung.match(/zeit=([^']+)/)[1];
     datum = vorstellung.match(/datum=([^']+)/)[1];

      //const kinosaal = vorstellung.match(/kinosaal=(\d+)/);
      //const sitzplan = vorstellung.match(/sitzplan=(\d+)/);
    };
    createVorstellungen(vorstellungen, FilmID);
    })

    .catch(error => {
      console.log('Fehler beim Abrufen der Daten:', error);
    });
  }
  
function ProgrammErstellung(){
    console.log(trailerURL);
    var div = document.getElementById("output");
    div.innerHTML +=`
    <div class="card">
    <table>
        <tr>
            <td>
                <div class="card__img">
                <iframe class="card__img" width="504" height="284" src="${trailerURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </td>
            <td>
                <div class="card__avatar"><img class="card__img" src="../img/filmplakat.jpeg"></div>
            </td>
        </tr>
    </table>
    
    <div class="card__title" id="titel"></div>
    <div class="card__subtitle"><span id="Daten"></span></div>
    <div>
        <table>
            <tr>
                <td class="Beschreibung">
                 <span class="Beschreibung" id="BeschreibungFilm"></span>    
                </td>
                <td class="Vorstellungendetails">
                    <a class="Vorstellungendetails"></a> 
                    <div id="vorstellungendaten"></div>
                </td>
            </tr>
        </table>
    </div>
</div>
`;
  // console.log(titel, dauer, fsk, genre, beschreibung);
    wertZuweisung();
    
    ;
}
function wertZuweisung () {
    var titelFilm = document.getElementById("titel");
    titelFilm.innerHTML = titel;
    var DatenFilm = document.getElementById("Daten");
    DatenFilm.innerHTML = dauer + "min,  FSK: "+ fsk + ", "+ genre ;
    var beschreibungfilm = document.getElementById("BeschreibungFilm");
    beschreibungfilm.innerHTML = beschreibung;
    //document.getElementById("ytFrame").src.innerHTML = trailerURL;
}

function createVorstellungen(vorstellungen, FilmID){
    console.log(titel + "Vorstellungstitel:"+ filmTitelVorst);
    for (var z = 0; z < vorstellungen.length; z++){
        var bspVorstellung = vorstellungen[z].match(/filmTitel='([^']+)'/)[1];
        
        console.log("Vorstellungen durchgehen." + bspVorstellung);

      if(bspVorstellung == titel){
        console.log("Titel Überprüfung." + bspVorstellung + " und "+ titel);
        uhrzeit = vorstellungen[z].match(/zeit=([^,]+)/)[1];
        datum = vorstellungen[z].match(/datum=([^,]+)/)[1];
        var vorstID = vorstellungen[z].match(/sitzplan=([^,]+)/)[1]
        const dynVorst = document.getElementById('vorstellungendaten');
        dynVorst.innerHTML += `
         <tr>
          <p onclick="getButtonText(event)" id="${FilmID}" data-meinevariable="${vorstID}" class="Vorstellungsbutton">${datum}, ${uhrzeit}  </p> 
         </tr>
    `
    console.log("button erstellt. ");
      }
      else 
      console.log("keine übereinstimmung");
  }
  console.log("done");
  z=0;
  }
  