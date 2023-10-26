document.addEventListener('DOMContentLoaded', function() {
    // Diese Funktion wird aufgerufen, sobald die Seite geladen ist
    test();
  });
  function test() {
    console.log("hat hoffentlich geklappt");
    const apiurl = "https://backend-message-board.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/messages/3"
    sendAPIRequest(apiurl);
  }
  function sendAPIRequest(data) {
    var raw = "";
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch(data, requestOptions)
      .then(response => response.text())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        const cleanedData = data.replace(/\[|\]|"/g, '');
        const finishedData = cleanedData.replace(/,/g, '<br>');
        resultsDiv.innerHTML = finishedData;
        console.log(cleanedData);
      })
      .catch(error => console.log('Fehler:', error));
  
  }