import React from 'react'

function FavoriteCities({ favoriteCities, search, removeFavoriteCity }) {
    return (
        <div className="favorite-cities">
            <h3>Favorite Cities</h3>
            <ul>
                {favoriteCities.map((city) => (
                    <li key={city}>
                        <span onClick={() => search(city)}>{city}</span>
                        <button onClick={() => removeFavoriteCity(city)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FavoriteCities