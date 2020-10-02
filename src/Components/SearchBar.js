import React from 'react'
import AlgoliaPlaces from 'algolia-places-react';

function SearchBar({ onChange }) {
    return (
        <AlgoliaPlaces
            placeholder='Input address here'
        
            options={{
                appId: process.env.REACT_APP_ALGOLIA_APP_ID,
                apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
                language: 'en',
                countries: [],
                type: 'address',
                // Other options from https://community.algolia.com/places/documentation.html#options
            }}
        
            onChange={ onChange }
        />
    )
}

export default SearchBar
