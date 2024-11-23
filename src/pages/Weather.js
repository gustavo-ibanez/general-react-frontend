import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box} from '@mui/material';
import { formatDate } from '../components/utils';
import BasePage from '../components/BasePage';
import Labels from '../utils/label/en-us';
import BaseButton from '../components/BaseButton';
import BaseSelect from '../components/BaseSelect';
import BaseInput from '../components/BaseInput';
import BaseTopPage from '../components/BaseTopPage';

const Weather = () => {
    const [countriesData, setCountryData] = useState(null);
    const [dataLocate, setDataLocate] = useState(null);
    const [dataWeather, setDataWeather] = useState(null);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [inputCity, setInputCity] = useState('');

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState('');
    };

    const handleChange = (event) => {
        setInputCity(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/localidade/paises', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(Labels.message.error.error + 'Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCountryData(data)
            })
            .catch((error) => setError(error.message));
    }, []);

    const states = countriesData && selectedCountry
                    ? countriesData.find((country) => country._id === selectedCountry)?.state
                    : {};

    const handleFetchWeather = async () => {
        try {
            setError(null);
            setDataLocate(null);
            setDataWeather(null);

            if (selectedCountry && selectedState && inputCity) {
            
                const locationResponse = await fetch(`http://localhost:5000/api/weather/location?city=${inputCity}&stateCode=${selectedState}&countryCode=${selectedCountry}`, {
                    method: 'GET',
                    mode: 'cors',
                });

                if (!locationResponse.ok) {
                    throw new Error(Labels.message.error.error + 'Network response was not ok: ' + locationResponse.statusText);
                }

                const locationData = await locationResponse.json();
                setDataLocate(locationData);
                
                if (locationData[0] != null) {
                    const { lat, lon } = locationData[0];

                    const weatherResponse = await fetch(`http://localhost:5000/api/weather/information?lat=${lat}&lon=${lon}`, {
                        method: 'GET',
                        mode: 'cors',
                    });

                    if (!weatherResponse.ok) {
                        throw new Error(Labels.message.error.error + 'Network response was not ok: ' + weatherResponse.statusText);
                    }

                    const weatherData = await weatherResponse.json();
                    setDataWeather(weatherData);
                } else {
                    setError(Labels.message.error.cityNotFound);
                }
            } else {
                setError(Labels.message.error.allRequired);
            }
        } catch (error) {
            setError(error.message)
        }
        
    };

    const sunriseTime = dataWeather ? (dataWeather.sys.sunrise + dataWeather.timezone) * 1000 : null;
    const sunsetTime =  dataWeather ? (dataWeather.sys.sunset + dataWeather.timezone) * 1000 : null;
    const currentTime = Date.now();
    const isDaytime = sunriseTime && (currentTime >= sunriseTime && currentTime <= sunsetTime);

    const urlImg = () => {
        if (isDaytime){
            return "/images/day1.jpeg";
        } else {
            return "/images/noite1.jpeg";
        }
    }
   
    const backgroundCity = {
        backgroundImage: 
            ` linear-gradient(to left, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 1) 70%), 
                url('/images/skyline.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '94%',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px',
        position: 'relative'
    };

    const backgroundStyle = {
        backgroundImage: 
            ` linear-gradient(to left, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 1) 100%), 
                url('` + urlImg() + `')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '94%',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px',
        position: 'relative'
    };

    return (
        <BasePage>
            <div>
                <BaseTopPage 
                    label={Labels.weather}
                    error={error}
                />

                <BaseSelect 
                        label = {Labels.country}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        itens = {countriesData}/>

                <BaseSelect 
                        label = {Labels.state}
                        value={selectedState}
                        onChange={(event) => setSelectedState(event.target.value)}
                        array = {Object.entries(states)}/>

                <BaseInput 
                    label = {Labels.city}
                    onChange={handleChange}
                    value={inputCity}
                />

                <BaseButton
                    onClick={handleFetchWeather}
                    label = {Labels.button.send}/>

                {dataLocate && (
                    <>
                        <Paper 
                            elevation={3} 
                            style={backgroundCity}
                        >
                            <Typography variant="h5" gutterBottom>
                                Result City:
                            </Typography>
                            <Box>
                                <Typography variant="body1"><strong>{Labels.city}:</strong> {dataLocate[0].name}</Typography>
                                <Typography variant="body1"><strong>{Labels.state}:</strong> {dataLocate[0].state}</Typography>
                                <Typography variant="body1"><strong>{Labels.country}:</strong> {dataLocate[0].country}</Typography>
                                <Typography variant="body1"><strong>{Labels.latitude}:</strong> {dataLocate[0].lat}</Typography>
                                <Typography variant="body1"><strong>{Labels.longitude}:</strong> {dataLocate[0].lon}</Typography>
                            </Box>
                        </Paper>
                    </>
                )}
                
                {dataWeather && (
                    <>
                        <Paper elevation={3}  style={backgroundStyle}>
                            <Typography variant="h5" gutterBottom >
                                Result Weather:
                            </Typography>
                            <Box>
                                <Typography variant="body1"><strong>{Labels.temperature}:</strong> {dataWeather.main.temp}</Typography>
                                <Typography variant="body1"><strong>{Labels.feelsLike}:</strong> {dataWeather.main.feels_like}</Typography>
                                <Typography variant="body1"><strong>{Labels.humidity}:</strong> {dataWeather.main.humidity}</Typography>
                                <Typography variant="body1"><strong>{Labels.percentClouds}:</strong> {dataWeather.clouds.all}</Typography>
                                <Typography variant="body1"><strong>{Labels.sunrise}:</strong> {formatDate(dataWeather.sys.sunrise + dataWeather.timezone)}</Typography>
                                <Typography variant="body1"><strong>{Labels.sunset}:</strong> {formatDate(dataWeather.sys.sunset + dataWeather.timezone)}</Typography>
                                <Typography variant="body1"><strong>{Labels.description}:</strong> {dataWeather.weather[0].description}</Typography>
                            </Box>
                        </Paper>
                    </>
                )}
            </div>
        </BasePage>
    );
};

export default Weather;