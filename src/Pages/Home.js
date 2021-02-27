import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar'
import Table from '../Components/Table'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';


function Home() {
    const [resultA, setResultA] = useState({
        address: '',
        coordinates: {
            latitude: 0,
            longitude: 0,
        },
        weather: '',
    })

    const [resultB, setResultB] = useState({
        address: '',
        coordinates: {
            latitude: '',
            longitude: '',
        },
        weather: '',
    })

    const search = (value) => {
        
        // Algolia call on SearchBar
        console.log('Antipodes App By Roland Edward Santos')
        console.log('Contact: dev.weward@gmail.com')

        // Point A
        const latitude = value.latlng.lat
        const longitude = value.latlng.lng
        // Get Antipode Coordinates
        let antiLat = (latitude < 0) ? Math.abs(latitude) : latitude;
        let antiLng = 180 - Math.abs(longitude)
        antiLat = (latitude > 0) ? -(parseFloat(antiLat)) : antiLat;
        antiLng = (longitude > 0) ? -(parseFloat(antiLng)) : antiLng;
        
        setResultA(prevState => ({
            ...prevState,
            address: `${value.value}`,
            coordinates: {
                latitude: latitude,
                longitude: longitude
            }
        }))

        // Get Point B
        axios({
            method: 'POST',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+antiLat+','+antiLng+'&key='+process.env.REACT_APP_GOOGLE_API_KEY,
        }).then((res) => {
            setResultB(prevState => ({
                ...prevState,
                address: res.data.results[0].formatted_address,
                coordinates: {
                    latitude: antiLat,
                    longitude: antiLng
                }
            }))
            
            // Get Weather for Point A
            getWeather(latitude, longitude)
                .then((res) => {
                    setResultA(prevState => ({
                        ...prevState,
                        weather: res
                    }))
                })

            // Get weather for Point B
            getWeather(antiLat, antiLng)
                .then((res) => {
                    setResultB(prevState => ({
                        ...prevState,
                        weather: res
                    }))
                })

        }).catch((err) => {
        
            console.log(err)
        })
    }

    const getWeather = (lat, lng) => {
        // const proxy = 'https://cors-anywhere.herokuapp.com/'
        const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
        const post_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                // url: `${proxy}${post_url}`
                url: `${post_url}`
            }).then((res) => {
                const sunrise = new Date(res.data.sys.sunrise * 1000)
                const hoursRise = sunrise.getHours()
                const minutesRise = "0" + sunrise.getMinutes()
                const secondsRise = "0" + sunrise.getSeconds()
                const formattedTimeSunrise = `${hoursRise}:${minutesRise.substr(-2)}:${secondsRise.substr(-2)}`

                const sunset = new Date(res.data.sys.sunset * 1000)
                const hoursSet = sunset.getHours()
                const minutesSet = "0" + sunset.getMinutes()
                const secondsSet = "0" + sunset.getSeconds()
                const formattedTimeSunset = `${hoursSet}:${minutesSet.substr(-2)}:${secondsSet.substr(-2)}`

                const iconType = getIconType(res.data.weather[0].main)

                const data = {
                    sunrise: formattedTimeSunrise,
                    sunset: formattedTimeSunset,
                    temp_min: res.data.main.temp_min,
                    temp_max: res.data.main.temp_max,
                    feels_like: res.data.main.feels_like,
                    wind_speed: res.data.wind.speed,
                    humidity: res.data.main.humidity,
                    pressure: res.data.main.pressure,
                    description: res.data.weather[0].description,
                    icon: iconType,
                }

                resolve(data)
            }).catch(() => {
                reject()
            })
        })
    }

    const getIconType = (weather) => {
        switch(weather) {
            case 'Thunderstorm':
                return 'THUNDER_RAIN'
            case 'Drizzle':
                return 'RAIN'
            case 'Rain':
                return 'RAIN'
            case 'Snow':
                return 'SNOW'
            case 'Mist':
                return 'FOG'
            case 'Smoke':
                return 'FOG'
            case 'Haze':
                return 'FOG'
            case 'Dust':
                return 'FOG'
            case 'Fog':
                return 'FOG'
            case 'Sand':
                return 'FOG'
            case 'Ash':
                return 'FOG'
            case 'Squall':
                return 'CLOUDY'
            case 'Tornado':
                return 'WIND'
            case 'Clear':
                return 'CLEAR_DAY'
            case 'Clouds':
                return 'CLOUDY'

            default:
                return 'CLEAR_DAY'
        }
    }

    return (
        <div>
            <div className="search-container">
                <h1>Edward's Antipodes</h1>
                <p>Ever wonder what it is like on the other side of the world?</p>
                <SearchBar onChange={ ({ suggestion }) => search(suggestion) }/>
            </div>
            <Grid container spacing={ 2 }>
                <Grid item xs={12} md={6}>
                    <Table data={ resultA } />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Table data={ resultB } />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
