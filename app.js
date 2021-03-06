window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        '.temperature-description'
    );
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //Get Data from the API
                    const { temperature, summary, icon } = data.currently;

                    // Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone; //because this data is not in "currently"

                    // FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);

                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // Toggle Celsius & Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureDegree.textContent = Math.floor(celsius);
                            temperatureSpan.textContent = 'C';
                        } else {
                            temperatureDegree.textContent = temperature;
                            temperatureSpan.textContent = 'F';
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: 'white',
        });

        // e.g. partly-cloudy-night => PARTLY_CLOUDY_NIGHT
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();

        // Start animation!
        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
