import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export default function Error() {
    return (
        <div>
            <Box sx={{textAlign: "-webkit-center", padding: "5vh"}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="250px"
                        image="https://i.imgflip.com/28ywvs.jpg"
                        alt="error"
                        sx={{padding: "2vh"}}
                    />
                    <CardContent sx={{padding: "5vh"}}>
                        <Typography gutterBottom variant="h5" component="div" >
                            Ocurrio un error
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Estamos tratando de arreglarlo.
                            <br/>
                            Intente nuevamente en un momento.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}