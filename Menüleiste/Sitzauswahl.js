var selectedButtons = [];

function toggleSelection(button) {
    var buttonId = button.id;
    if(checkIfExisting (buttonId) == true) {
        deleteFromSelectedList(buttonId);
    }
    else {
        addToSelectedList(buttonId)
        button.classList.toggle("selected");
    }  
    }


function addToSelectedList(buttonId) {
selectedButtons.push(buttonId);
updateSelectedList();
}

function deleteFromSelectedList (buttonId) {
    selectedButtons.splice(i,1);
    updateSelectedList();
}

function checkIfExisting (buttonId){
    for (let i = 0; i < selectedButtons.length; i++) {
        if (liste[i] === buttonId) { 
            return true;
        }
        else {return false;}        
      }
}

function updateSelectedList() {
var selectedList = document.getElementById("selectedList");
selectedList.innerHTML = "";

for (var i = 0; i < selectedButtons.length; i++) {
var listItem = document.createElement("div");
var listItem = document.createElement("li");
var checkbox = document.createElement("input");
checkbox.type = "checkbox";
listItem.appendChild(document.createTextNode("Sitz: "));
listItem.appendChild(document.createTextNode(selectedButtons[i]))
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
checkbox2.id = "Vergünstigt"+ i;
listItem.appendChild(document.createTextNode("Vergünstigt"));
selectedList.appendChild(listItem);

}}
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