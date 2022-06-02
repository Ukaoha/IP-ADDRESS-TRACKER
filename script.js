"use strict";
// https://geo.ipify.org/api/v2/country,city?apiKey=at_agqwm6oqAfQ5ngQRXSLnvlcU7qDSF&ipAddress=8.8.8.8

const searchIp = document.querySelector(".userbtn");
const ipContainer = document.querySelector('.container');
// const ipAddressContainer = document.querySelector('.ipaddress');
// const location = document.querySelector('.location');
// const timezone = document.querySelector('.timezone');
// const isp = document.querySelector('.isp');
let lattitude;
let longitutude;
let zoom = 1;

const mapDisplay = function(lattitude, longitutude){
  const map = L.map('map').setView([lattitude, longitutude], 13);
  

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const marker = L.marker([lattitude, longitutude]).addTo(map);

}

searchIp.addEventListener("click", function () {
  let ipAddress = document.querySelector(".UserInput").value;
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_agqwm6oqAfQ5ngQRXSLnvlcU7qDSF&ipAddress=${ipAddress}`
  )
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        ipData(data)
        renderUsersData(data)
        mapDisplay(lattitude,longitutude)
    });
});

const ipData = function(usersData) {
    lattitude = usersData.location.lat ;
    longitutude = usersData.location.lng ;
}
const renderUsersData =  function(usersData){
  ipContainer.innerHTML = `    <div class="main-content">
  <div class="ip-info">
    <label for="">IP Address</label>
    <h3 class="ipaddress">${usersData.ip}</h3>
  </div>
  <div class="ip-info">
    <label for="">location</label>
    <h3 class="location" >${usersData.location.city } , ${usersData.location.region }, ${usersData.location.country}</h3>
  </div>

  <div class="ip-info">
    <label for="">timezone</label>
    <h3 class="timezone" >${usersData.location.timezone}</h3>
  </div>

  <div class="ip-info">
    <label for="">isp</label>
    <h3 class="isp">${usersData.isp }</h3>
  </div>

</div>
`

}


  

