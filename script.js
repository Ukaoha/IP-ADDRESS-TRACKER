"use strict";
/*
TODOS
// select elements 
fetch Api from geo.ipfy
use the data and render it in the dom
get lattitude and logitutude for the map 
initialize map using leaflet 
call all functions with event listener
*/
// https://geo.ipify.org/api/v2/country,city?apiKey=at_agqwm6oqAfQ5ngQRXSLnvlcU7qDSF&ipAddress=8.8.8.8

const searchIp = document.querySelector(".userbtn");
const ipContainer = document.querySelector('.container');
let lattitude;
let longitutude;
let domain;


const mapDisplay = function(lattitude, longitutude){
  const map = L.map('map').setView([lattitude, longitutude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const marker = L.marker([lattitude, longitutude]).addTo(map);

}

 

searchIp.addEventListener('click' , function() {
  let ipAddress = document.querySelector(".UserInput").value;
  fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_agqwm6oqAfQ5ngQRXSLnvlcU7qDSF&domain=${ipAddress}`
  ).then(function (response) {
    if(response.status == 200) {
      return response.json();
    // } else {throw new Error('Please enter correct IP address or domain name') }
    }else {
     ipContainer.innerHTML = `<h3 class = 'error-message' style="text-align: center">Pls enter correct IP address or domain </h3>`

    }
  }).then((data) => {
    console.log(data);
    ipData(data)
    renderUsersData(data)
    mapDisplay(lattitude, longitutude)

  }).catch((err) => {
    console.log("Error: ", err.message);
  })

})

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


  

