import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import humidity_icon from '../Assets/humidity.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'


function Weather() {
    const inputRef = useRef()
    const [weatherData, setWeatehdata] = useState(false);
    const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem('lastSearchedCity') || 'London');
    const [favoriteCities, setFavoriteCities] = useState(JSON.parse(localStorage.getItem('favoriteCities')) || []);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name ")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon || clear_icon]
            setWeatehdata({
                city: data.name,
                weather: data.weather[0].description,

                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
            localStorage.setItem('lastSearchedCity', city);
            setLastSearchedCity(city);
        } catch (error) {
            setWeatehdata(false)
            console.error(" Error in fetching Weather Data")
        }

    }
    const saveFavoriteCity = () => {
        if (weatherData && !favoriteCities.includes(weatherData.city)) {
            const updatedFavorites = [...favoriteCities, weatherData.city];
            setFavoriteCities(updatedFavorites);
            localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
        }
    };
    const removeFavoriteCity = (cityToRemove) => {
        const updatedFavorites = favoriteCities.filter(city => city !== cityToRemove);
        setFavoriteCities(updatedFavorites);
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    };
    useEffect(() => {
        search(lastSearchedCity)
    }, [lastSearchedCity])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search'
                    id="city-search"
                    name="city-search"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search(e.target.value);
                        }
                    }} />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temprature ' >{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
                <button onClick={saveFavoriteCity} className="favorite-button">
                    Favorites
                </button>
            </> : <></>}
            {favoriteCities.length > 0 && (
                <div className="favorite-cities">
                    <h3>Favorite Cities</h3>
                    <ul>
                        {favoriteCities.map(city => (
                            <li key={city}>
                                <span onClick={() => search(city)}>{city}</span>
                                <button onClick={() => removeFavoriteCity(city)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Weather