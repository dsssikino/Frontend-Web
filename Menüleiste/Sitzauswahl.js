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


document.addEventListener("DOMContentLoaded", function() {
    // Code, der beim Laden der Seite ausgeführt werden soll
    
    var urlParams = new URLSearchParams(window.location.search);
 IDFIlm = urlParams.get('id');
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
      updateSelectedList();
      console.log("Button hinzugefügt:", button.textContent);
    } else {
      // Button ist bereits im Array, entferne ihn
      deleteFromSelectedList(index, 1);
      updateSelectedList();
      button.classList.remove("selected");
      console.log("Button entfernt:", button.textContent);
    }
    }


function addToSelectedList(buttonId) {
selectedButtons.push(buttonId);
updateSelectedList();
}

function deleteFromSelectedList (buttonId) {
    selectedButtons.splice(buttonId,1);
    updateSelectedList();
}

function preisErmitteln(){
     var gesamtBetrag = 0;
     getSelectedCheckboxes;
     
}

function updateSelectedList() {
var selectedList = document.getElementById("selectedList");
selectedList.innerHTML = "";

for (var i = 0; i < selectedButtons.length; i++) {
    
    selectedList.innerHTML +=`
    <div>
    <table>
  <tr>
    <th>Sitz <span id="SitzID${i}"></span>:</th>
    <th>
    <label for="erw${i}">Erwachsener</label>
    <input type="radio" id="erw${i}" name="group${i}" onclick="ratioAuswahlt(this)">
    </th>
    <th>
    <label for="erm${i}">Ermäßigt</label>
    <input type="radio" id="erm${i}" name="group${i}" onclick="ratioAuswahlt(this)">
    </th>
    <th>
    <label for="kind${i}">Kind</label>
    <input type="radio" id="Kind${i}" name="group${i}" onclick="ratioAuswahlt(this)">
    </th>
    <th><span id="ticketPreis${i}"></span></th>
  </tr>
</table>
    </div>

    `;
    var myElement = document.getElementById("SitzID"+i);
    myElement.innerHTML = selectedButtons[i].id;
    
}
}
var gesamtSumme;
/*function ratioAuswahlt(this) {
    var id = this.id;
    var kategorie = id.text.substring(0, 3);
    if(kategorie == "erw"){
        var preis = document.getElementById("ticketPreis"+IDFIlm);
        preis.innerHTML = erwachsene;
    }
    else if(kategorie == "erm"){
        var preis = document.getElementById("ticketPreis"+IDFIlm);
        preis.innerHTML = ermaßigt;
    }
    else (kategorie == "kin")
        var preis = document.getElementById("ticketPreis"+IDFIlm);
        preis.innerHTML = kinder;
    
}*/

function getSelectedItems() {
    var list = document.getElementById("list");
    var checkboxes = list.querySelectorAll("input[type='checkbox']:checked");
  
    checkboxes.forEach(function(checkbox) {
      var listItem = checkbox.parentNode;
      var itemName = listItem.querySelector("span").textContent;
      console.log(itemName);
    });
  }
/* buchen */
function buchen(){
getSelectedCheckboxes();
window.location.href = "Buchung2.html";
}

/* Checkbox Überprüfung  */
var selectedKategorie = [];

function getSelectedCheckboxes() {
var selectedList = document.getElementById("selectedList");
selectedList.innerHTML = "";

var checkboxes = document.querySelectorAll("input[type='checkbox']");
for (var i = 0; i < checkboxes.length; i++) {
  if (checkboxes[i].checked) {
    selectedKategorie.push(checkboxes[i], checkboxes[i].id);
}
}
}