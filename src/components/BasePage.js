import React from 'react';
import { Box, Stack, Paper } from '@mui/material';

const BasePage = ({ children }) => {

    const childrenArray = React.Children.toArray(children);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                padding: 2,
            }}
        >
            <Stack spacing={2} sx={{ width: '100%', alignItems: 'center'}}>
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
                    {childrenArray[0] || null}
                </Paper>
                {childrenArray[1] && (
                    <Paper sx={{ marginTop: '20px', width: '100%' }}>
                        {childrenArray[1]}
                    </Paper>
                )}
                {childrenArray[2] && (
                    <Paper sx={{ marginTop: '20px', width: '100%' }}>
                        {childrenArray[2]}
                    </Paper>
                )}  
            </Stack>
        </Box>
    );
};

export default BasePage;