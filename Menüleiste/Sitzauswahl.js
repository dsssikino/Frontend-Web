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
     }
  )
  .catch(error => console.error('Fehler bei der API-Anfrage:', error));
  console.log(titel);
  
  
  });

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

function preisErmitteln(){
     var gesamtBetrag = 0;
     
     
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
var gebuchteSitzeDaten=[];

function werteAuslesen(ratioInputs){
  for(var c =0; c<ratioInputs.length;c++){
    var ratioInput = ratioInputs[c];
    var vorstID2 = ratioInput.dataset.parameter1;
    var sitzID2 = ratioInput.dataset.parameter2;
    gebuchteSitzeDaten.push({IdFilm : IDFIlm, IdVorst: vorstID2, IdSitz: sitzID2})
    console.log("Hier wird getestet, ob die VOrstellungsid ausgelesen werden kann: "+vorstID2+"sitzid: "+ sitzID2+ "filmid: " + IDFIlm );
    
  }
  localStorage.setItem('gebuchteSitze', JSON.stringify(gebuchteSitzeDaten));

}