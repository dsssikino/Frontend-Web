/* Programmfilter, Genre*/
document.getElementById('genre').addEventListener('change', function() {
    var selectedCategory = this.value;
    var products = document.getElementsByClassName('genre'); /* Class genre bei Filmen im genre parameter */
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
  
      if (selectedCategory === 'all' || product.classList.contains(selectedCategory)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  });
/* Programmfilter, FSK*/
document.getElementById('fsk').addEventListener('change', function() {
    var selectedCategory = this.value;
    var products = document.getElementsByClassName('fsk'); /* Class FSK bei Filmen im fsk parameter */
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
  
      if (selectedCategory === 'all' || product.classList.contains(selectedCategory)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  });  
  /* Button auslesen*/
  function getButtonText(){
    
    window.location.href = "Buchung.html";
  }
  function navigateBuchung (){
   
    var button = document.getElementById("BuchungButton").textContent;
    Buchung.html.getElementById("Vorstellungszeit")= buttonText; 
  }
  var filme = [];
  var i;
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
                    const titel = film.match(/titel='([^']+)'/)[1];
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
                                <td class="Abstand3"></td>
                                <td class="Abstand4 plakate-box"><img id="${i+1}" onclick="filmdetails(event)" src="../img/filmplakat.jpeg" alt="Filmposter" class="poster"></td>
                                <td class="Abstand5">
                                  <table>
                                    <tr class="Info-Anzeige">
                                  <div class="Filmtitel" onclick="filmdetails(event)" id="${i+1}">${titel}</div>
                                  <small><span class="genre">${genre}, FSK: <span class="fsk">${fsk}</span>, ${dauer} min</span></small>
                                </tr>
                                <mtr class="Vorstellungen-Anzeige">
                                  <div>
                        
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
                                  </div>
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
                  }
	            })
	            .catch(error => console.error('Fehler bei der API-Anfrage:', error));
    
  }
  function filmdetails(event) {
    var clickedElementId = event.target.id;
    window.location.href = "Programm2.html?id=" + clickedElementId;
    
    var urlParams = new URLSearchParams(window.location.search);
    var FilmID = urlParams.get('id') - 1;

    const film = filme[FilmID];
                    const titel = film.match(/titel='([^']+)'/)[1];
                    const genre = film.match(/genre='([^']+)'/)[1];
                    const fsk = film.match(/fsk=(\d+)/)[1];
                    const dauer = film.match(/dauer=(\d+)/)[1];
                    //const erwachsene = film.match(/erwachsene=(\d+)/)[1];
                    //const ermaßigt = film.match(/ermaßigt=(\d+)/)[1];
                    //const kinder = film.match(/kinder=(\d+)/)[1];
                    //const kategorie = film.match(/kategorie='([^']+)'/)[1];

    console.log(film);
    const detailsAusgabe = document.getElementById("details");
    detailsAusgabe.innerHTML += `
    <div><h1>test</h1></div>
    `;
  }

 
