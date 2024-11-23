import React, { useEffect, useState } from 'react';
import { Alert, Typography, Box, Paper} from '@mui/material';
import BasePage from '../components/BasePage'; 
import Labels from '../utils/label/en-us';
import BaseButton from '../components/BaseButton';
import BaseSelect from '../components/BaseSelect';
import BaseTopPage from '../components/BaseTopPage';

const ExchangeRates = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [currencies, setCurrencies] = useState([]);  
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:5000/api/exchangeRates/currencies', {
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
                const currenciesArray = Object.entries(data);
                setCurrencies(currenciesArray);
            })
            .catch((error) => setError(error.message));
    }, []);
    
    const handleFetchExchangeRates = () => {
        setError(null);
        setData(null);
        if (fromCurrency && toCurrency) {
            fetch('http://localhost:5000/api/exchangeRates?from=' +fromCurrency+  '&to='+toCurrency, {
                method: 'GET',
                mode: 'cors',
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(Labels.message.error.error + 'Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error.message); // Armazena a mensagem de erro
            });
        }
        else {
            setError(Labels.message.error.currencyRequired);
        }
    }
    
    return (
        <BasePage>
            <div>
                <BaseTopPage 
                    label= {Labels.exchangeRates}
                    error={error}
                />

                <BaseSelect 
                        label = {Labels.from}
                        value = {fromCurrency}
                        disabled={false}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        array = {currencies}
                        />

                <BaseSelect 
                        label = {Labels.to}
                        value = {toCurrency}
                        disabled={false}
                        onChange={(e) => setToCurrency(e.target.value)}
                        array = {currencies}
                        />

                <BaseButton button="true" variant="contained"
                    onClick={handleFetchExchangeRates}
                    label = {Labels.button.search}/>

                        
                {data && (
                    <>
                        <Paper 
                            elevation={3} 
                            style={{
                                padding: '20px',
                                marginTop: '20px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px'
                            }}
                        >
                            <Box>
                                <Typography variant="body1"><strong>{Labels.from}:</strong> {data.from}</Typography>
                                <Typography variant="body1"><strong>{Labels.to}:</strong> {data.to}</Typography>
                                <Typography variant="body1"><strong>{Labels.value}:</strong> {data.valor}</Typography>
                            </Box>
                        </Paper>
                    </>
                )}
            </div>
        </BasePage>

    );
};

export default ExchangeRates;