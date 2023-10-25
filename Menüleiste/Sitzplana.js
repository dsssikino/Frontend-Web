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
var IDFIlm;
var IDVorst;

document.addEventListener("DOMContentLoaded", function() {
    // Code, der beim Laden der Seite ausgeführt werden soll
    const saalplanElement = document.getElementById("saalplan");
    saalplanElement.innerHTML = `
    <div class="button-container">
</div>

<div class="table-spacing"></div>
<div class="button-container">
  <!-- Erste Reihe -->
  <button class='custom-button' id='1' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='2' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='3' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='4' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='5' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='6' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='7' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='8' onclick='toggleSelection(this)'></button>
  <!-- Zweite Reihe -->
</div>
<div class="button-container">
  <button class='custom-button' id='9' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='10' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='11' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='12' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='13' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='14' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='15' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='16' onclick='toggleSelection(this)'></button>
</div>
<div class="button-container">
  <button class='custom-button' id='17' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='18' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='19' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='20' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='21' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='22' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='23' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='24' onclick='toggleSelection(this)'></button>
</div>
<div class="button-container">
  <button class='custom-button' id='25' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='26' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='27' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='28' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='29' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='30' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='31' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='32' onclick='toggleSelection(this)'></button>
</div>
<div class="button-container">
  <button class='custom-button' id='33' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='34' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='35' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='36' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='37' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='38' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='39' onclick='toggleSelection(this)'></button>

</div>
<div class="button-container">
  <button class='custom-button' id='40' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='41' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='42' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='43' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='44' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='45' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='46' onclick='toggleSelection(this)'></button>
  <button class='custom-button' id='47' onclick='toggleSelection(this)'></button>
</div>

<div class="button-container">
    `;
    console.log("es wurden nun alle button erstellt und die ID muss existieren!!");
    var urlParams = new URLSearchParams(window.location.search);
 IDFIlm = urlParams.get('id');
 IDVorst = urlParams.get('vorstID');
 console.log("die Vorstellungsid ist: "+ IDVorst);
    console.log("Die Seite wurde geladen!"+ IDFIlm);
    fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
  .then(response => response.text()) // Ändern Sie .json() auf .text(), da die API eine Textantwort sendet
  .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      console.log(data);
      const filmText = data;
      const filme = filmText.match(/Film{[^}]+}/g);

         film = filme[IDFIlm];
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
        Titel.innerHTML = titel;
        belegung();
     }
  )
  .catch(error => console.error('Fehler bei der API-Anfrage:', error));
  console.log(titel);
    })

  var raw = "";
  var sitze = [];

  function belegung(){
var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/sitzplanAnzeigen?sitzplan="+ IDVorst, requestOptions)
  .then(response => response.text())
  .then(data => {
    // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
    console.log(data);
    const sitzText = data;
    sitze = sitzText.match(/{[^}]+}/g); 
    console.log(sitze +"und für einen test"+ sitze[12]);
    sitzeÜberprüfen(sitze);
  })
  .catch(error => console.log('error', error));
}


function sitzeÜberprüfen(sitze){
  const trennzeichen = " ";
    for(var i= 0; i < sitze.length; i++){
       if(sitze[i].includes('true')){
        const position = sitze[i].indexOf(trennzeichen);
        const sitzID3 = sitze[i].substring(0, position);
        const sitzID4 =  sitzID3.replace(/{/,"");
        const button = document.getElementById(sitzID4);
        button.classList.toggle("disabled");
        button.disabled = true;
        console.log(sitze[i]);
       }
    }
}
var selectedButtons = [];

function toggleSelection(button) {
    var index = selectedButtons.indexOf(button);
    if (index === -1) {
      // Button ist nicht im Array, füge ihn hinzu
      addToSelectedList(button);
      button.classList.add("selected");
      updateSelectedList(IDVorst);
      console.log("Button hinzugefügt:", button.textContent);
    } else {
      // Button ist bereits im Array, entferne ihn
      deleteFromSelectedList(index, 1);
      updateSelectedList(IDVorst);
      button.classList.remove("selected");
      console.log("Button entfernt:", button.textContent);
    }
    }


function addToSelectedList(buttonId,IDVorst) {
selectedButtons.push(buttonId);
updateSelectedList(IDVorst);
}

function deleteFromSelectedList (buttonId) {
    selectedButtons.splice(buttonId,1);
    updateSelectedList(IDVorst);
}
  


function updateSelectedList(IDVorst) {

var selectedList = document.getElementById("selectedList");
selectedList.innerHTML = "";
var urlParams = new URLSearchParams(window.location.search);
 IDFIlm = urlParams.get('id');
 IDVorst = urlParams.get('vorstID');

for (var i = 0; i < selectedButtons.length; i++) {
  
 console.log("Überprüfung ob id vorhanden: "+IDVorst);

    selectedList.innerHTML +=`
    <div>
    <table>
  <tr>
  
    <th>Sitz <span id="SitzID${i}"></span>:</th>
    <th>
    
    <input type="radio" id="erw${i}" name="group${i}" onclick="saveSelectedRatios(${i})" data-parameter1="${IDVorst}" data-parameter2="${selectedButtons[i].id}" >    
    <label for="erw${i}">Erwachsener</label>

    </th>
    <th>
    <input type="radio" id="erm${i}" name="group${i}" onclick="saveSelectedRatios(${i})" data-parameter1="${IDVorst}" data-parameter2="${selectedButtons[i].id}" >
    <label for="erm${i}">Ermäßigt</label>

    </th>
    <th>
    <input type="radio" id="Kind${i}" name="group${i}" onclick="saveSelectedRatios(${i})" data-parameter1="${IDVorst}" data-parameter2="${selectedButtons[i].id}" >
    
    <label for="kind${i}">Kind</label>

    </th>
    <th>
    <label for="ticketPreisEinz${i}">-Preis:</label>
    <span id="ticketPreisEinz${i}"></span></th>
  </tr>
</table>
    </div>

    `;
    var myElement = document.getElementById("SitzID"+i);
    myElement.innerHTML = selectedButtons[i].id;
    
}
}

var gesamtSumme;

function ratioAuswahlt(ratioInputs, i) {
  console.log("Kinder: " + kinder + " Erwachsener: " + erwachsene + " ermäßigt: " + ermaßigt);

  for (var a = 0; a < ratioInputs.length; a++) {
    var button = ratioInputs[a];
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

var ratioInputs = [];
function saveSelectedRatios(i) {
  ratioInputs = document.querySelectorAll('input[type="radio"]:checked');
  ratioAuswahlt(ratioInputs,i);
  console.log(ratioInputs);
}

function getRatioArray(){
}

/* buchen */
function buchen(){
  werteAuslesen(ratioInputs);
  //console.log(ratioInputs + "  "+ jsonArrayList);
  window.location.href = "Buchung2.html";
}

function werteAuslesen(ratioInputs){
  var gebuchteSitzeDaten=[];

  for(var c =0; c<ratioInputs.length;c++){
    var ratioInput = ratioInputs[c];
    var vorstID2 = ratioInput.dataset.parameter1;
    var sitzID2 = ratioInput.dataset.parameter2;
    var sitzID2 = ratioInput.dataset.parameter2;
    var kat = ratioInput.id;
    gebuchteSitzeDaten.push({IdFilm : IDFIlm, IdVorst: vorstID2, IdSitz: sitzID2, kategorie: kat})
    console.log("Hier wird getestet, ob die VOrstellungsid ausgelesen werden kann: "+vorstID2+"sitzid: "+ sitzID2+ "filmid: " + IDFIlm );
    
  }
  localStorage.setItem('gebuchteSitze', JSON.stringify(gebuchteSitzeDaten));

}