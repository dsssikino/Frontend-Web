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
  // Anzeige vom Programm: Samu 
  function updateInputValues() {

    const filmText = "[Film{titel='Inception', genre='Science Fiction', fsk=16, dauer=148, erwachsene=2, ermaßigt=1, kinder=3, kategorie='Blockbuster'}, Film{titel='Interstellar', genre='Science Fiction', fsk=12, dauer=169, erwachsene=3, ermaßigt=2, kinder=2, kategorie='Blockbuster'}, Film{titel='The Shawshank Redemption', genre='Drama', fsk=12, dauer=142, erwachsene=4, ermaßigt=1, kinder=1, kategorie='Klassiker'}]";
  
    const filme = filmText.match(/Film{[^}]+}/g);
  
  
    document.getElementById('inputFields').innerHTML = '';
  
  
    for (let i = 0; i < filme.length; i++) {
      const film = filme[i];
      const titel = film.match(/titel='([^']+)'/)[1];
      const genre = film.match(/genre='([^']+)'/)[1];
      const fsk = film.match(/fsk=(\d+)/)[1];
      const dauer = film.match(/dauer=(\d+)/)[1];
      const erwachsene = film.match(/erwachsene=(\d+)/)[1];
      const ermaßigt = film.match(/ermaßigt=(\d+)/)[1];
      const kinder = film.match(/kinder=(\d+)/)[1];
      const kategorie = film.match(/kategorie='([^']+)'/)[1];
  
  
      const inputFields = document.getElementById('inputFields');
      inputFields.innerHTML += `
            <div>
    <div class="film-table">
      <div class="film-image">
        <img src="${titel}.jpg" alt="${titel}">
        <input type="file" accept="image/*" id="bild-upload2">
  
      </div>
      <div class="film-cell">
        <!-- Reihe mit 3 Boxen -->
        <div class="info-box">
          <div class="info-label">Titel:</div>
          <input type="text" id="titelInput${i + 1}" placeholder="Titel" value="${titel}">
          <input type="hidden" id="imagePathInput">
        </div>
        <div class="info-box">
          <div class="info-label">Genre:</div>
          <input type="text" id="genreInput${i + 1}" placeholder="Genre" value="${genre}">
        </div>
        <div class="info-box">
          <div class="info-label">FSK:</div>
          <input type="text" id="fskInput${i + 1}" placeholder="FSK" value="${fsk}">
        </div>
        <div class="info-box">
          <div class="info-label">Dauer:</div>
          <input type="text" id="dauerInput${i + 1}" placeholder="Dauer" value="${dauer}">
        </div>
  
      </div>
      <div class="film-cell">
        <!-- 4 Boxen in der rechten Spalte -->
        <div class="info-box">
          <div class="info-label">Kategorie:</div>
          <input type="text" id="kategorieInput${i + 1}" placeholder="Kategorie" value="${kategorie}">
        </div>
        <div class="info-box">
          <div class="info-label">Erwachsene:</div>
          <input type="text" id="erwachseneInput${i + 1}" placeholder="Erwachsene" value="${erwachsene}">
        </div>
        <div class="info-box">
          <div class="info-label">Schüler, Azubi, Student:</div>
          <input type="text" id="ermaßigtInput${i + 1}" placeholder="Ermaßigt" value="${ermaßigt}">
        </div>
        <div class="info-box">
          <div class="info-label">Kinder:</div>
          <input type="text" id="kinderInput${i + 1}" placeholder="Kinder" value="${kinder}">
        </div>
      </div>
    </div>
    <div class="table-spacing"></div>
  </div>
          `;
    }
  
  }
  function filmdetails() {
    window.location.href = "Programm2.html";

  }

  const apiUrl = 'https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/testAPI';

fetchData(apiUrl)
  .then(data => {
    // Hier kannst du die Daten der API-Antwort verwenden
    console.log(data);
  })
  .catch(error => {
    // Hier kannst du den Fehler behandeln
    console.error(error);
  });
