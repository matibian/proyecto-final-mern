import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, IconButton, Snackbar, Tooltip } from '@mui/material';
import ItemModal from './ItemModal.jsx';
import { useCart } from '../../context/CartContext.js';
import { Box } from '@mui/system';



export default function ItemGrid({ item }) {
    const { name, img, price, id, stock } = item
    const [buttonPopup, setButtonPopup] = useState(false)
    const [itemModal, setItemModal] = useState()
    const { addItem, cart } = useCart()
    const [snackBar, setSnackbarState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = snackBar;



    const handleClose = () => {
        setSnackbarState({ ...snackBar, open: false });
    };



    const onAdd = () => {
        let purchase = {
            id, name, price, stock, img, quantity: 1
        }
        addItem(purchase)
        setSnackbarState({ ...snackBar, open: true })
    }

    const stockLimit = () => {

        const found = cart.find((prod) => prod.id === id)
        if (found) {
            return (found.stock - found.quantity)
        }
        else {

            return stock

        }
    }




    const handleClick = () => {
        setButtonPopup(true);
        setItemModal(item)
    }

    return (
        <>
            <Card sx={{ width: 220, height: 215 }}>
                <>
                    <Box sx={{ height: "110px" }}>
                        <CardMedia
                            component="img"
                            height="110"
                            sx={{ objectFit: "scale-down" }}
                            image={img}
                            alt="img"
                        />
                    </Box>
                    <CardContent padding="0 5px">
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, fontWeight: "bold", padding: "0 5px" }} >
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" marginBottom="0px">
                            ${price.toLocaleString('de-DE')}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ positition: "relative", bottom: "25px" }} >
                        <Button
                            onClick={() => handleClick()}
                            variant="contained"
                            color="secondary"
                            sx={{ width: "55%", fontSize: "10px", paddingBottom: "2px", color: "white" }}

                        >
                            Detalles
                        </Button>
                        <ItemModal
                            trigger={buttonPopup}
                            setTrigger={setButtonPopup}
                            item={{ ...itemModal }} />
                        <Tooltip title="Alcanzaste el limite de stock" disableHoverListener={stockLimit() !== 0} followCursor>
                        <span>
                            <IconButton
                                disabled={stockLimit() === 0}
                                color="primary"
                                aria-label="add to shopping cart"
                                onClick={onAdd}
                            >
                                <AddShoppingCartIcon sx={{ color: "rgb(36 24 64)", paddingTop: "2px" }} />
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={open}
                                    onClose={handleClose}
                                    autoHideDuration={2000}
                                    message={`Agregaste 1 producto/s al carrito`}
                                />
                            </IconButton>
                        </span>
                    </Tooltip>
                    </CardContent>
                    <br />
                    <br />
                </>

            </Card>
        </>
    );

}
