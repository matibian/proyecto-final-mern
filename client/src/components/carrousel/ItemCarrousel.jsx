import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, IconButton, Snackbar, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.js";

export default function ItemCarrousel({ item }) {
  const { name, thumbnail, price, _id, id, stock } = item;
  const navigate = useNavigate();
  const { cart, addItem } = useCart();

  const [snackBar, setSnackbarState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = snackBar;

  const handleClose = () => {
    setSnackbarState({ ...snackBar, open: false });
  };

  const onAdd = () => {
    let purchase = {
      _id,
      name,
      price,
      stock,
      thumbnail,
      quantity: 1,
    };
    setSnackbarState({ ...snackBar, open: true });
    addItem(purchase);
  };

  const stockLimit = () => {
    const found = cart.find((prod) => prod._id === _id);
    if (found) {
      return found.stock - found.quantity;
    } else {
      return stock;
    }
  };

  return (
    <Card
      sx={{
        width: 160,
        height: 200,
        backgroundImage: `url("${thumbnail}")`,
        backgroundSize: "160px 200px",
      }}
    >
      <>
        <CardContent padding="5px"></CardContent>
        <CardContent
          sx={{
            position: "absolute",
            bottom: "5px",
            margin: "5px",
            padding: "0",
            backgroundColor: "#7c756c6b",
            width: "155px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "55%",
              fontSize: "10px",
              paddingBottom: "2px",
              color: "white",
            }}
            onClick={() => navigate(`/detail/${_id ? _id : id}`)}
          >
            Detalles
          </Button>
          <Tooltip
            title="Alcanzaste el limite de stock"
            disableHoverListener={stockLimit() !== 0}
            followCursor
          >
            <span>
              <IconButton
                disabled={stockLimit() === 0}
                color="primary"
                aria-label="add to shopping cart"
                onClick={onAdd}
              >
                <AddShoppingCartIcon
                  sx={{ paddingTop: "2px", color: "white" }}
                />
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
  );
}
