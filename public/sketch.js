const weatherDiv = document.createElement('p');
    
    if ("geolocation" in navigator) {                       
    
        console.log("la géolocalisation est disponible !") ;
        
        navigator.geolocation.getCurrentPosition(async position => {
            let lat, lon, jsonweather;
            try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const api_url = `/weather/${lat}&${lon}`; //on va demander au server d'allez chercher le weather selon lat et lon ('&' ou ',' est un séparateur)
            const responseweather = await fetch(api_url);
            jsonweather = await responseweather.json();
            console.log(jsonweather);

            let summary = document.createElement('span');
            summary.id = "summary";
            summary.textContent ="salut"

            weatherDiv.innerHTML="";
            weatherDiv.innerHTML = 'The weather here at <span id="latitude"></span>&deg, <span id="longitude"></span>&deg is <span id="summary"></span> with a temperature of <span id="temperature"></span> &degC';
            document.body.appendChild(weatherDiv);        

            
                document.getElementById('temperature').textContent = jsonweather.main.temp;
                document.getElementById('latitude').textContent = lat.toFixed(2);
                document.getElementById('longitude').textContent = lon.toFixed(2);
                document.getElementById('summary').textContent = jsonweather.weather[0].main;
            } catch (error) {
                console.log('SOMETHING WENT WRONG !')
            }
            const data = { lat , lon, jsonweather };

            const options = { 
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                };

            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);

        });
        
    } else {
        console.log("la géolocalisation n'est pas disponible")
    }



