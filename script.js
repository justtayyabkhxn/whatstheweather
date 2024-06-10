const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const cityNameElement = document.getElementById('city-name');
let weatherBoxes = []; // Array to store weather boxes



function toggleMode() {
    document.body.classList.toggle('light-mode');
}


updateDateTime();
search.addEventListener('click', () => {
    const APIKey = '514b5b560b740e6a5a9c793574fa09ef';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }




        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;
            container.style.height = '595px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'resources/clear.png';
                    break;
                case 'Rain':
                    image.src = 'resources/rain.png';
                    break;
                case 'Snow':
                    image.src = 'resources/snow.png';
                    break;
                case 'Mist':
                    image.src = 'resources/mist.png';
                    break;
                case 'Haze':
                    image.src = 'resources/mist.png';
                    break;
                default:
                    image.src = 'resources/cloud.png';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
            cityNameElement.textContent = `Showing ${json.name}, ${json.sys.country}`;


        }



    });
});

function updateDateTime() {
    const dateTimeElement = document.getElementById('current-datetime');
    const now = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    dateTimeElement.textContent = `${day}, ${date}, ${time}`;
}

setInterval(updateDateTime, 1000);