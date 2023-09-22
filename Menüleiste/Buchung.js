const axios = require('axios');
const fs = require('fs');

// Define the base URL for your FastAPI server
const baseUrl = 'https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io';

function toggleSelection(button) {
        button.classList.toggle("selected");
        var buttonId = button.id;
      addToSelectedList(buttonId)
}
var selectedButtons = [];

  function addToSelectedList(buttonId) {
    selectedButtons.push(buttonId);
    updateSelectedList();
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
  
 /* Navigation Buchung 3 */
 function redirectToBuchung3() {
     // Create a new booking
  // Call the /hello endpoint
  // cancelBooking(1); // Cancel a booking with the specified ID
    createBooking(); // Create a new booking
    payBooking(25);
    window.location.href = "Buchung3.html";
 // Pay for a booking with the specified ID
// validateBooking(1); // Validate a booking with the specified ID

  } 
 
  // Function to create a booking
async function createBooking() {
  try {
    const response = await axios.post(`${baseUrl}/bookings/`, {
      show_id: 1, // Replace with your booking data
      customer_id: 1, // Replace with your booking data
      seats: 'A1,A2', // Replace with your booking data
      amount: 100, // Replace with your booking data
    });

    console.log('Booking created:', response.data["id"]);
  } catch (error) {
    console.error('Error creating booking:', error.response.data);
  }
}

// Function to call the /hello endpoint
async function sayHello() {
  try {
    const response = await axios.get(`${baseUrl}/hello`);

    console.log('Hello from server:', response.data);
  } catch (error) {
    console.error('Error calling /hello endpoint:', error.response.data);
  }
}

// Function to cancel a booking
async function cancelBooking(bookingId) {
  try {
    const response = await axios.delete(`${baseUrl}/bookings/${bookingId}/`);

    console.log('Booking canceled:', response.data);
  } catch (error) {
    console.error('Error canceling booking:', error.response.data);
  }
}

// Function to pay for a booking
async function payBooking(bookingId) {
  // Send a PUT request to the pay_booking endpoint with responseType: 'arraybuffer'
  axios.put(`${baseUrl}/bookings/${bookingId}/pay/`, null, {
    responseType: 'arraybuffer'
  })
    .then(response => {
      // Check the response status code
      if (response.status === 200) {
        console.log("Payment successful. PDF file downloaded.");
        // You can save the PDF file here if needed
        fs.writeFileSync("invoice.pdf", Buffer.from(response.data));
      } else {
        console.log(`Payment failed. Status code: ${response.status}`);
        console.log(response.data);  // Print the response content for debugging
      }
    })
    .catch(error => {
      console.error("Error making the request:", error);
    });
}

// Function to validate a booking
async function validateBooking(bookingId) {
  try {
    const response = await axios.put(`${baseUrl}/bookings/${bookingId}/validate/`);

    console.log('Booking validated:', response.data);
  } catch (error) {
    console.error('Error validating booking:', error.response.data);
  }
}