const axios = require('axios');
const fs = require('fs');

// Define the base URL for your FastAPI server
const baseUrl = 'https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io';


 /* Navigation Buchung 3 */
 var button = document.getElementById("testBuchung");
  button.addEventListener("click", redirectToBuchung3);

 function redirectToBuchung3() {
  
    myBooking =createBooking(); // Create a new booking
  // Call the /hello endpoint
  // cancelBooking(1); // Cancel a booking with the specified ID
    payBooking(24);
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

    console.log('Booking created:', response.data);
  } catch (error) {
    console.error('Error creating booking:', error.response.data);
  }
}

// Function to call the /hello endpoint
async function sayHello() {
  try {
    const response = await axios.get(`${baseUrl}/hello`);

    console.log('Hello from server:', response.data);
    return response.data; // Fixed typo here
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

// Buchungscode von Ian 
