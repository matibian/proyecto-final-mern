import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Esqueleto() {
    return (
        <Card sx={{ width: 150, height: 200 }}>
            <Skeleton variant="rectangular" width={"cover"} height={75} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    <Skeleton />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12}} >
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </Typography>
            </CardContent>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <Skeleton variant="rounded" width={70} height={40}  />
                    <Skeleton variant="rounded" width={70} height={40} />
                </div>
            <CardContent>
                <Skeleton variant="rounded" width={300} height={40}  />
            </CardContent>
        </Card>
    );
}