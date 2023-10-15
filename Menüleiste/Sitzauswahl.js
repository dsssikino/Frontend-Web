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
    checkbox();
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
// Funktion zum Ermitteln der ausgewählten Checkboxen
function getSelectedCheckboxes() {
    var selectedCheckboxes = [];
  
    // Alle Checkboxen im Dokument auswählen
    var alleCheckboxen = document.querySelectorAll("input[type='checkbox']");
  
    // Schleife zum Überprüfen jeder Checkbox
    for (var i = 0; i < alleCheckboxen.length; i++) {
      var checkbox = alleCheckboxen[i];
  
      // Überprüfe, ob die Checkbox ausgewählt ist
      if (checkbox.checked) {
        selectedCheckboxes.push(checkbox);
      }
    }
  
    return selectedCheckboxes;
  }
  
  // Beispielcode zum Aufrufen der Funktion
  var ausgewaehlteCheckboxen = getSelectedCheckboxes();
  console.log(ausgewaehlteCheckboxen);
function updateSelectedList() {
var selectedList = document.getElementById("selectedList");
selectedList.innerHTML = "";

for (var i = 0; i < selectedButtons.length; i++) {
var listItem = document.createElement("div");
var listItem = document.createElement("li");
var checkbox = document.createElement("input");
checkbox.type = "checkbox";
listItem.appendChild(document.createTextNode("Sitz: "));
listItem.appendChild(document.createTextNode(selectedButtons[i].id))
listItem.appendChild(document.createTextNode(" Kategorie: "));
listItem.appendChild(checkbox);
checkbox.id = "Erwachsener"+ i;

listItem.appendChild(document.createTextNode("Erwachsener"));
selectedList.appendChild(listItem);


// Hinzufügen von zwei weiteren Checkboxen
var checkbox1 = document.createElement("input");
checkbox1.type = "checkbox";
checkbox1.id = "Kind"+ i;

listItem.appendChild(checkbox1);
listItem.appendChild(document.createTextNode("Kind"));
selectedList.appendChild(listItem);

var checkbox2 = document.createElement("input");
checkbox2.type = "checkbox";
listItem.appendChild(checkbox2);
checkbox2.id = "Ermäßigt"+ i;
listItem.appendChild(document.createTextNode("Ermäßigt"));
selectedList.appendChild(listItem);


}}
function checkbox (){
for (var i = 0; i < selectedButtons.length; i++) {
    // Event Listener hinzufügen
    var checkErID = "Erwachsener" +i;
    var checkKiID = "Kind" +i;
    var checkEmID = "Ermäßigt" +i;

    if (checkErID.checked) {
        checkKiID.checked = false;
        checkEmID.selected = false;
      }

// Event Listener für die Checkboxen hinzufügen
    if (checkKiID.checked) {
        checkErID.checked = false;
        checkEmID.selected = false;
    }
  ;
  
    if (checkEmID.checked) {
        checkErID.checked = false;
        checkKiID.checked = false;
    }
  ;
  }}
    
  
  checkbox3.addEventListener("change", function() {
    if (checkbox3.checked) {
      checkbox1.checked = false;
      checkbox2.checked = false;
    }
  });
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