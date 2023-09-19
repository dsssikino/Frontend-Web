fetch('https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/helloworld', { mode: 'no-cors'})
.then(response => response.json())
    .then(function(data))
    .catch(error => {
      console.log(error);
    });