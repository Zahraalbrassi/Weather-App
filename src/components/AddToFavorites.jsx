import React from 'react'

function AddToFavorites({ weatherData, favoriteCities, setFavoriteCities }) {
    const saveFavoriteCity = () => {
        if (weatherData && !favoriteCities.includes(weatherData.city)) {
            const updatedFavorites = [...favoriteCities, weatherData.city];
            setFavoriteCities(updatedFavorites);
            localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
        }
    };
    return (
        <div>
            <h2 onClick={saveFavoriteCity} className='fav'>Add To Favorites</h2>
        </div>
    )
}

export default AddToFavorites