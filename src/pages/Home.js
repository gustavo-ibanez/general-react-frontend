import * as React from 'react';
import Grid from '@mui/material/Grid2';
import ButtonBaseDemo from '../components/ComplexButton';
import { Box } from '@mui/material';
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
    const { Labels } = useLanguage();

    const images = [
        {
            url: "/images/currency.jpg",
            title: Labels.exchangeRates,
            to: "/exchangeRates",
            width: "80%",
            height: "100%",
            key: 1,
        },
        {
            url: "/images/weather.jpg",
            title: Labels.weather,
            to: "/weather",
            width: "80%",
            height: "100%",
            key: 2,
        },
        {
            url: "/images/shoppingList.jpg",
            title: Labels.shoppingList,
            to: "/shoppingList",
            width: "80%",
            height: "100%",
            key: 3,
        },
        {
            url: "/images/products.jpg",
            title: Labels.product,
            to: "/product",
            width: "80%",
            height: "100%",
            key: 4,
        },
        {
            url: "/images/store.jpg",
            title: Labels.store,
            to: "/store",
            width: "80%",
            height: "100%",
            key: 5,
        },
        {
            url: "/images/priceTag.jpeg",
            title: Labels.productPrice,
            to: "/productPrice",
            width: "80%",
            height: "100%",
            key: 6,
        },
    ];

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1 }}
        >
            <Grid container spacing={6} justifyContent="center" size="grow">
                {images.map((image) => (
                    <Grid
                        size={12}
                        key={image.key}
                        style={{
                            width: "100%",
                            height: 400,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ButtonBaseDemo
                            imageUrl={image.url}
                            imageTitle={image.title}
                            linkTo={image.to}
                            imageWidth={image.width}
                            imageHeight={image.height}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
