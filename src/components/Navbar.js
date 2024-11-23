import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Link } from 'react-router-dom';
import Labels from '../utils/label/en-us';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    //icons thema
    //https://mui.com/material-ui/material-icons/
    const list = () => (
        <List>
            <ListItemButton button="true" component={Link} to="/" onClick={toggleDrawer(false)}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Home" />}
            </ListItemButton>
            <Divider />
            <ListItemButton button="true" component={Link} to="/exchangeRates" onClick={toggleDrawer(false)}>
                <ListItemIcon><MonetizationOnRoundedIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Exchange Rates" />}
            </ListItemButton>
            <ListItemButton button="true" component={Link} to="/weather" onClick={toggleDrawer(false)}>
                <ListItemIcon><WbSunnyRoundedIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Weather" />}
            </ListItemButton>
            <ListItemButton button="true" component={Link} to="/shoppingList" onClick={toggleDrawer(false)}>
                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Shopping List" />}
            </ListItemButton>
            <ListItemButton button="true" component={Link} to="/store" onClick={toggleDrawer(false)}>
                <ListItemIcon><StoreIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Store" />}
            </ListItemButton>
            <ListItemButton button="true" component={Link} to="/productPrice" onClick={toggleDrawer(false)}>
                <ListItemIcon><LocalOfferIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Product Price" />}
            </ListItemButton>
            <ListItemButton button="true" component={Link} to="/product" onClick={toggleDrawer(false)}>
                <ListItemIcon><QrCodeIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Product" />}
            </ListItemButton>
        </List>
    );

    const drawerWidth = 260;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton button="true" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {Labels.button.myApp}
                    </Typography>
                    <Button button="true" color="inherit" component={Link} to="/">
                        {Labels.button.home}
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Compensação da altura do AppBar */}
            <Toolbar />

            <Drawer
                variant="temporary" 
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
            >
                {list()}
            </Drawer>
        </Box>
    );
};

export default Navbar;