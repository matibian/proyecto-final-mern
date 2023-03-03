import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function EsqueletoGrid() {
    return (
        <Card sx={{ width: 220, height: 215 }}>
            <Skeleton variant="rectangular" width={"90%"} height={110} />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12}} width={"90%"}>
                    <Skeleton />
                    <Skeleton />
                </Typography>
                <Typography gutterBottom variant="h5" component="div" width={"50%"}>
                    <Skeleton />
                </Typography>
            </CardContent>
            <CardContent sx={{display: "flex", padding: "0 35px",
    columnGap: "26px"}}>
                <Skeleton variant="rounded" width={100} height={25}  />
                <Skeleton variant="rounded" width={30} height={25} sx={{borderRadius:"25px"}} />
            </CardContent>
        </Card>
    );
}