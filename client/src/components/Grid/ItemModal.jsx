import React from 'react'

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../modalDetail.css'

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ItemModal(props) {

  const navigate = useNavigate()
  
  
  const { id, name, description, img, price,stars } = props.item


  return (props.trigger) ? (
    <div className='popup'>
      <div className="popup-inner">
        <IconButton
          onClick={()=> props.setTrigger(false)}
          className="close-btn">
          <CloseIcon />
        </IconButton>
          <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <CardMedia
                        component="img"
                        height="200"
                        sx={{objectFit:"scale-down"}}
                        width="40vw"
                        image={img}
                        alt="img"
                    />
                </Grid>
                <Grid item xs={6} md={6} style={{ alignItems: 'center' }} >
                    <CardContent>
                        <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: "bold", padding: "5px" }} >
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, fontWeight: "bold", padding: "5px", textAlign: "justify" }} >
                            {description}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" marginBottom="0px">
                            ${price.toLocaleString('de-DE')}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ positition: "relative", bottom: "25px" }} >
                        <Rating name="read-only" value={stars} readOnly precision={0.5}  />
                        <br/>
                        <br/>
                        <Button 
                            onClick={()=>navigate(`/detail/${id}`) }
                            variant="contained" 
                            style={{
                                backgroundColor: "rgb(36 24 64)",
                                fontSize: "10px"}}>
                            Ver más...
                            
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        {props.children}
      </div>
    </div>
  ) : "";
}
