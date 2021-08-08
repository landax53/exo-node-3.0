
// ------------------------------------------------------//
// ------------------- ISS MAP  --------------------------//
// ------------------------------------------------------//

 // Making a map and tiles
 const mymap = L.map('issMap').setView([0, 0], 1);
 const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenstreetMap</a> Contributors';
 const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
 const tiles = L.tileLayer(tileUrl, { attribution });
 tiles.addTo(mymap);

 // Making a marker with a custom icon
 /*const issIcon = L.icon({
     iconUrl: '320-issIcon.png',
     iconSize: [50, 32],
     iconAnchor: [25, 16],
 });

 const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

 const api_url_ISS = 'https://api.wheretheiss.at/v1/satellites/25544';

 let firstTime = true;
 async function getISS() {
     const response = await fetch(api_url_ISS);
     const data_ISS = await response.json();
     const { latitude_ISS, longitude_ISS } = data_ISS;

     marker.setLatLng([latitude_ISS, longitude_ISS])
     if (firstTime) {
         mymap.setView([latitude_ISS, longitude_ISS], 2)
         firstTime = false;
     }
         document.getElementById('lat').textContent = latitude_ISS.toFixed(2);
         document.getElementById('lon').textContent = longitude_ISS.toFixed(2);
 }
 
 getISS();

 setInterval(getISS, 1000);*/



 getData();

async function getData() {

    const response = await fetch('/api');
    const data = await response.json();
    console.log(data)

    for(item of data) {
        const marker = L.marker([item.lat, item.lon]).addTo(mymap);

        
        const txt = `The weather here at ${item.lat.toFixed(2)}&deg,  
        ${item.lon.toFixed(2)}&deg is ${item.jsonweather.weather[0].main} 
        with a temperature of ${item.jsonweather.main.temp} &degC`;
    
        marker.bindPopup(txt);
    }
}
