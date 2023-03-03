import { AccountCircle } from '@mui/icons-material';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function OrdersPointer() {

    const navigate = useNavigate()


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/mis_pedidos/${event.target.value}`)
        }
    }





    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10vh 0',
            height: '70vh',
            textAlign: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
            },
        }}
        >
            <Paper elevation={3}>
                <Grid sx={{ padding: '3vh 10vh' }}>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: 25, fontWeight: "bold", paddingBottom: "4vh" }} >
                        Ingrese su ID de compra para conocer el estado
                    </Typography>
                    <br />
                    <br />
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <AccountCircle sx={{ color: 'rgb(36 24 64)', mr: 1, my: 0.5 }} />
                        <TextField
                            color="secondary"
                            id="input-with-sx"
                            onKeyDown={handleKeyDown}
                            label="ID de compra"
                            variant="standard"
                            type="text"
                        />
                    </Box>
                </Grid>
            </Paper>
        </Box>
    )
}
