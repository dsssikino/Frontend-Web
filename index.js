
function seitenwechsel(){
    window.location.href = "apiTest.html";
}


function fetchFilme(){
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
                    fetchAndDisplayImage(titel, i)
                }
            })                 
        }            
    

function fetchAndDisplayImage(titel, i) {
    const imageElement = document.getElementById("allePlakate2"); // Das vorhandene img-Element
    const imageUrl = "https://backendfiles.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/files/"+ titel+".jpg";
  
    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen des Bildes');
        }
        return response.blob();
      })
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        imageElement.src = objectURL;
        console.log("Bild gefunden und wird dem film gegen.Für: "+ titel + "iD: "+ i+1);
      })
      .catch(error => console.error('Fehler:', error));
  }