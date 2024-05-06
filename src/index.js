document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.getElementById('loginForm');
    if (window.location.pathname !== '/auth/login.html') {
        window.location.href = '/auth/login.html';
    } else {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            axios.post("http://localhost:8080/api/login", { username, password })
                .then((response) => {
                    // Handle successful login
                    console.log(response.data);
                    window.location.href = '../index.html';
                })
                .catch((error) => {
                    // Handle login error
                    console.error(error);
                });
        });
    }

// fetchLocationData();
function fetchVehicleLocations() {
    axios.get("http://localhost:8080/api/location/all-vehicle-locations")
    .then(response => {
        let markers = [];
        response.data.forEach(function (location){
           let marker = L.marker([location.latitude, location.longitude]).addTo(map)
            .bindPopup(`Latitude: ${location.latitude}<br>Longitude: ${location.longitude}`);

            markers.push(marker);
        });

        //creating a bound object to contain all markers
        let bounds = new L.LatLngBounds(markers.map(marker => marker.getLatLng()));
        map.fitBounds(bounds);
    })
    .catch(error => {
        console.error("error fetching location data", error);
    });
}

if(document.getElementById('map')){
    // Initialize the Leaflet map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetchVehicleLocations();
}
// fetchVehicleLocations();

//register vehicle function
function registerVehicle(make,model,regNumber){
    axios.post("http://localhost:8080/api/vehicle", {make,model,regNumber}, 
    { headers: { 'Content-Type': 'application/json' } })
    .then(response => {
        response.data;
    })
    .catch(error => {
        alert.error("error registering", error);
    });
}

//fetch registered vehicles
function fetchVehicleData() {
    axios.get("http://localhost:8080/api/vehicle/get-vehicles")
    .then(response => {
        let vehicleHtml = "<h3>Registered Vehicles</h3><table><tr><th>Make</th><th>Model</th><th>Registration Number</th></tr>";

        response.data.forEach(function (vehicle){
           vehicleHtml += 
           `<div>
              <tr>
                <td>${vehicle.make}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.regNumber}</td>
              </tr>
           </div>`;

           let vehicleElement = document.getElementById("vehicles-list");
           vehicleElement.innerHTML = vehicleHtml;
        });
    })
    .catch(error => {
        alert.error("error getting vehicle location", error);
    });
}

function handleRegisterSubmit(event){
    event.preventDefault();
    
    let make = document.getElementById("vehicle-make").value;
    let model = document.getElementById("vehicle-model").value;
    let regNumber = document.getElementById("vehicle-regNum").value; 
    registerVehicle(make, model, regNumber);
}


let registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", handleRegisterSubmit);

fetchVehicleData();
});