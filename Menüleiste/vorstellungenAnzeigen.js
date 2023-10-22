class Vorstellung {
    constructor(filmTitel, zeit, datum, kinosaal, sitzplan) {
      this.filmTitel = filmTitel;
      this.zeit = zeit;
      this.datum = datum;
      this.kinosaal = kinosaal;
      this.sitzplan = sitzplan;
    }
  }
  
  let vorstellungen = [];
  
  function fetchData() {
    fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungAnzeigen')
      .then(response => response.json())
      .then(data => {
        const Vorstellungen = data.match(/Vorstellung{[^}]+}/g);
        // Iteriere über die erhaltenen Daten und erstelle Vorstellungsobjekte
        Vorstellungen.forEach(item => {
          const vorstellung = new Vorstellung(
            item.filmTitel,
            item.zeit,
            item.datum,
            item.kinosaal,
            item.sitzplan
          );
          vorstellungen.push(vorstellung);
          console.log(vorstellung);
        });
  
        console.log(vorstellungen);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }
  
  // Starte den Abruf der Daten
  fetchData();