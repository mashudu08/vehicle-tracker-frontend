function registerVehicle(){
    axios.post("")
}
function handleRegisterSubmit(event){
    event.preventDefault();
    
    let make = document.querySelector("#vehicle-make").value;
    let model = document.querySelector("#vehicle-model").value;
    let registrationNumber = document.querySelector("#vehicle-regNum").value; 
}

let registerForm = document.getElementById("#register-form");
registerForm.addEventListener("submit", handleRegisterSubmit);

//register vehicle function


var map = L.map('map');
map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.watchPosition(myLocation, error);


let marker, circle, zoomed; 

function myLocation(pos){

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

   marker = L.marker([lat, lng]).addTo(map);
   circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

   if(!zoomed){
        zoom = map.fitBounds(circle.getBounds());
   }
   
  map.setView([lat,lng]);

// var marker = L.marker([51.5, -0.09]).addTo(map);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);
}

function error(err){
    if(err.code === 1){
        alert("please allow geolocation access");
    }else{
        alert("cannot get current location");
    }
}