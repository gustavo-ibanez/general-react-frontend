import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import Weather from './pages/Weather';
import ShoppingList from './pages/ShoppingList';
import Store from './pages/Store'
import Product from './pages/Product'
import ProductPrice from './pages/ProductPrice'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { LanguageProvider } from "./context/LanguageContext";


const App = () => {
    return (
        <LanguageProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/exchangeRates" element={<ExchangeRates />} />
                        <Route path="/weather" element={<Weather />} />
                        <Route path="/shoppingList" element={<ShoppingList />} />
                        <Route path="/store" element={<Store/>} />
                        <Route path="/productPrice" element={<ProductPrice/>} />
                        <Route path="/product" element={<Product/>} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </LanguageProvider>
    );
};

export default App;