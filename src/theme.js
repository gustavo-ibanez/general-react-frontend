import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6200ea',
        },
        secondary: {
            main: '#03dac5',
        },
        common: {
            black: '#000',
            white: '#fff',
          },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#eee9e8',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    padding: '10px 20px',
                    fontWeight: 'bold',
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    margin: '10px 0',
                    width: '100%',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    padding: '10px',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-row.highlight-row': {
                        backgroundColor: '#F4AAAA',
                   }
                },
                columnHeaders: {
                    backgroundColor: '#cfc9c8',
                    fontWeight: 'bold'
                },
            },
        },
    },
});

export default theme;