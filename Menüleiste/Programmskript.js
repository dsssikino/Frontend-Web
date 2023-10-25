//var titel;

var filmTitelVorst;
var uhrzeit;
var datum;
var vorstellungen = [];
var vorstID;
  function fetchFunctionVorst(i, titel){
    console.log(titel);
  console.log("fetch Vorstellungen beginnt");
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
     vorstID = vorstellung.match(/sitzplan=(\d+)/);
    };
    createVorstellungen(vorstellungen, i, titel);
    })

    .catch(error => {
      console.log('Fehler beim Abrufen der Daten:', error);
    });
  }


  function createVorstellungen(vorstellungen,i, titel){
    console.log(titel + "Vorstellungstitel:"+ filmTitelVorst);
    for (var z = 0; z < vorstellungen.length; z++){
        var bspVorstellung = vorstellungen[z].match(/filmTitel='([^']+)'/)[1];
        
        console.log("Vorstellungen durchgehen." + bspVorstellung);

      if(bspVorstellung == titel){
        console.log("Titel Überprüfung." + bspVorstellung + " und "+ titel);
        uhrzeit = vorstellungen[z].match(/zeit=([^,]+)/)[1];
        datum = vorstellungen[z].match(/datum=([^,]+)/)[1];
        var vorstID = vorstellungen[z].match(/sitzplan=([^}]+)/)[1]

        const dynVorst = document.getElementById('vorstellungendaten'+ i);
        dynVorst.innerHTML += `
         <tr>
          <p onclick="getButtonText(event)" id="${i}" data-meinevariable="${vorstID}" class="Vorstellungsbutton">${datum}, ${uhrzeit}  </p> 
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
/* Programmfilter, Titel*/
function titelFiltern() {
  console.log("filtern startet");
  var selectTitel = document.getElementById("searchInput").value;
  var products = document.getElementsByClassName('titel');
  console.log("nach folgendem wert wird gesucht:"+ selectTitel);
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (selectTitel === 'all' || product.classList.contains(selectTitel)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  }
};
 
  /* Button auslesen*/
  function getButtonText(event){
    var element = event.target;
    var idFilm = element.id;
    var vorstellungID = element.dataset.meinevariable;
    console.log(idFilm);
    window.location.href = "Buchung.html?id=" + idFilm + "&vorstID="+vorstellungID;
  }
  function navigateBuchung (){
   
    var button = document.getElementById("BuchungButton").textContent;
    Buchung.html.getElementById("Vorstellungszeit")= buttonText; 
  }
  var filme = [];
  var vorstellungen = [];
  var i;
  var titel;
  // Anzeige vom Programm: Samu 
  function updateInputValues() {

    // Hier können Sie den API-Aufruf durchführen, wenn der Button geklickt wird
	        fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
	            .then(response => response.text()) // Ändern Sie .json() auf .text(), da die API eine Textantwort sendet
	            .then(data => {
	                // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
                  console.log(data);
                  const filmText = data;
                  const filme = filmText.match(/Film{[^}]+}/g);

  
  
                  for (let i = 0; i < filme.length; i++) {
                    const film = filme[i];
                    titel = film.match(/titel='([^']+)'/)[1];
                    const genre = film.match(/genre='([^']+)'/)[1];
                    const fsk = film.match(/fsk=(\d+)/)[1];
                    const dauer = film.match(/dauer=(\d+)/)[1];
                    //const erwachsene = film.match(/erwachsene=(\d+)/)[1];
                    //const ermaßigt = film.match(/ermaßigt=(\d+)/)[1];
                    //const kinder = film.match(/kinder=(\d+)/)[1];
                    //const kategorie = film.match(/kategorie='([^']+)'/)[1];
                    
                
                    const ausgabe = document.getElementById('FilmAusgabe');
                    ausgabe.innerHTML += `
                    <div class="movie_card" id="bright">
                    <div class="info_section">
                        <div >
                            <table class="programmzusammenfassung">
                              <tr>
                                <td></td>
                                <td class=" plakate-box"><img id="${i+1}" onclick="filmdetails(event)" src="../img/2.jpg" alt="Filmposter" class="poster"></td>
                                <td >
                                  <table>
                                    <tr class="Info-Anzeige">
                                  <div class="Filmtitel Info-Anzeige" onclick="filmdetails(event)" id="titel">${titel}</div>
                                  <small><span class="genre Info-Anzeige" id="genre">${genre}</span> , FSK: <span class="fsk" id="fsk">${fsk}</span>, ${dauer} min</span></small>
                                </tr>
                                <mtr class="Vorstellungen-Anzeige">
                                <table>
                                <div id="vorstellungendaten${i}"></div>
                                <script>
                                window.onload = createVorstellungen();
                                </script>
                                </table>
                                </tr>
                                </table>
                                </td>
                                <td class="Abstand3"></td>
                              </tr>
                            </table>
                          </div>
                      </div>
                  <div class="blur_back bright_back"></div>
                </div>
               
                        `;
                        fetchFunctionVorst(i, titel);
                  }
  })}

  function filmdetails(event) {
    var clickedElementId = event.target.id;
    console.log(clickedElementId);
    window.location.href = "Programm2.html?id=" + clickedElementId + "&vorstID="+ vorstID;
  }
  /*Vorstellungen dynamisch einfügen*/
   
