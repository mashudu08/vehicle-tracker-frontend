// var map = L.map('map');
// map.setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// navigator.geolocation.watchPosition(myLocation, error);


// let marker, circle, zoomed; 

// function myLocation(pos){

//     const lat = pos.coords.latitude;
//     const lng = pos.coords.longitude;
//     const accuracy = pos.coords.accuracy;

//    marker = L.marker([lat, lng]).addTo(map);
//    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

//    if(!zoomed){
//         zoom = map.fitBounds(circle.getBounds());
//    }
   
//   map.setView([lat,lng]);

// // var marker = L.marker([51.5, -0.09]).addTo(map);

// // var circle = L.circle([51.508, -0.11], {
// //     color: 'red',
// //     fillColor: '#f03',
// //     fillOpacity: 0.5,
// //     radius: 500
// // }).addTo(map);
// }

// function error(err){
//     if(err.code === 1){
//         alert("please allow geolocation access");
//     }else{
//         alert("cannot get current location");
//     }
// }
// //TODO: fetch coordinates from backend

// function fetchLocationData() {
//     axios.get("https://localhost:8080/api/location/get-locations")
//     .then(response => {
//         response.data.forEach(function (location){
//             L.marker([location.latitude, location.longitude]).addTo(map)
//             .bindPopup(`Vehicle ID: ${location.vehicle.vehicleId}<br>Latitude: ${location.latitude}<br>Longitude: ${location.longitude}<br>Timestamp: ${location.timestamp}`);
//         });
//     })
//     .catch(error => {
//         console.error("error fetching location data", error);
//     });
// }

// var map = L.map('map');
// map.setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// function fetchLocationData() {
//     // axios.get("http://localhost:8080/api/location/all-vehicle-locations")
//     // .then(response => {
//     //     response.data.forEach(function (location){
//     //         L.marker([location.latitude, location.longitude]).addTo(map)
//     //         .bindPopup(`Latitude: ${location.latitude}<br>Longitude: ${location.longitude}`);
//     //     });
//     // })
//     // .catch(error => {
//     //     console.error("error fetching location data", error);
//     // });

//     axios.get('http://localhost:8080/api/location/all-vehicle-locations')
//   .then(function (response) {
//     var coordinates = response.data;
//     for (var i = 0; i < coordinates.length; i++) {
//       if (coordinates[i].x && coordinates[i].y) {
//         var marker = L.marker([coordinates[i].x, coordinates[i].y])
//           .bindPopup("Device: " + coordinates[i].device_type + '<br>' + "Time: " + coordinates[i].datetime)
//           .addTo(map);
//       }
//     }
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }
// Initialize the Leaflet map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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

fetchVehicleLocations();
//TODO: add markers

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
