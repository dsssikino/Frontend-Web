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

document.addEventListener("DOMContentLoaded", function() {
    // Code, der beim Laden der Seite ausgeführt werden soll
    var urlParams = new URLSearchParams(window.location.search);
    var FilmID = urlParams.get('id') - 1;
    
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
         trailerURL = film.match(/trailerURL='([^']+)'/)[1];
         beschreibung = film.match(/beschreibung='([^']+)'/)[1];

         
         
     }
  )
  .catch(error => console.log('Fehler bei der API-Anfrage:', error));
  console.log(titel);
  
      ProgrammErstellung();
  });
function ProgrammErstellung(){
    var Titel = document.getElementById("aktuellerTitel");
        Titel.innerHTML = "titel";
    var ProgrammDetails = document.getElementById("details");
    ProgrammDetails.innerHTML +=`
    <div class="movie-card2">
  
    <div class="container5">
      <div class="plakatProgramm">
      <a href="#"><img src="/img/filmplakat.jpeg" alt="cover" class="cover" /></a>
      <iframe class="filmeinbettung" align="right" width="476" height="268" src=trailerURl title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

      </div>   
      <div class="hero">
              

        <div class="details" width= 1000px>
        
          <div class="title1" id="titel"></div>
  
          <div class="title2" id="Daten"></div>    
          
          
        </div> <!-- end details -->
        
      </div> <!-- end hero -->
      
      <div class="description">
        
        <div class="column1">
          <span class="tag" id="genreFilm></span>
        </div> <!-- end column1 -->
        
        <div class="column2">
          
          <p id="BeschreibungFilm"></p>          
          
          
        </div> <!-- end column2 -->
      </div> <!-- end description -->
      
      
    <table>
        <tr class="abstand10"></tr>
        <tr>
            <table>
                <tr>
                  <th>Montag</th>
                  <th>Dienstag</th>
                  <th>Mittwoch</th>
                  <th>Donnerstag</th>
                  <th>Freitag</th>
                  <th>Samstag</th>
                  <th>Sonntag</th>
                </tr>
                <tr>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >16:30 </button> </td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >16:30 </button>  </td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton">16:30 </button> </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >18:00 </button> </td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >18:00 </button></td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >18:00 </button></td>
                </tr>
                <tr>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >20:30 </button> </td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >20:30 </button></td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >20:30 </button></td>
                  <td></td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >20:30 </button> </td>
                </tr>
                <tr>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >22:30 </button> </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >22:30 </button> </td>
                  <td></td>
                  <td><button onclick="getButtonText()" id="BuchungButton" class="Vorstellungsbutton" >22:30 </button> </td>
                </tr>
              </table>
        </tr>
        <tr></tr>
    </table>
          
    </div> <!-- end container -->
  </div> <!-- end movie-card -->

    `
    var titelFilm = document.getElementById("titel");
    titelFilm.innerHTML = titel;
    var DatenFilm = document.getElementById("Daten");
    DatenFilm.innerHTML = dauer + "min,  FSK: "+ fsk ;
    var genreFilm = document.getElementById("genreFilm");
    genreFilm.innerHTML = genre;
    var beschFilm = document.getElementById("BeschreibungFilm");
    beschFilm.innerHTML = beschreibung;
    ;
}
