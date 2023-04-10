import { AccountCircle } from "@mui/icons-material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import logo from "../images/logofashion.png";
import { useAuth } from "../context/AuthContext";

export default function CheckOut() {
  const logout = useAuth();
  const { user } = useUser();
  const { cart, cartTotal, envio, clear, discount, descuento } = useCart();
  const [send, setSend] = useState(false);
  const [idCompra, setIdCompra] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direccion, setDireccion] = useState("");

  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    finishPurchase(data);
    setLoading(true);
  };

  function finishPurchase() {
    let direcOrder = direccion == "" ? user.dir : direccion;

    let order = {
      buyer: {
        name: user.name,
        mail: user.email,
        phone: user.phone,
        address: direcOrder,
      },
      envio: envio,
      carrito: cart,
      total: Number(cartTotal() + envio),
      descuento: discount ? "10%" : "NO",
    };

    fetch("http://127.0.0.1:8080/api/orders/checkout", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        setError(err);
        logout();
      })
      .then(({ ordernumber }) => {
        setIdCompra(ordernumber);
        clear();
        setSend(true);
        descuento(false);
      });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10vh 0",
          textAlign: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Paper elevation={3}>
          <Grid sx={{ padding: "5vh 10vh" }}>
            {!send ? (
              <>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    fontSize: 25,
                    fontWeight: "bold",
                    paddingBottom: "4vh",
                  }}
                >
                  Checkout
                </Typography>
                <div
                  style={{
                    alignItems: "start",
                    display: "inline-flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <AccountCircle
                      sx={{ color: "rgb(36 24 64)", mr: 1, my: 0.5 }}
                    />
                    <Typography
                      variant="body"
                      color="text.primary"
                      sx={{
                        fontSize: 16,
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Box>
                  <br />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <ContactPhoneIcon
                      sx={{ color: "rgb(36 24 64)", mr: 1, my: 0.5 }}
                    />
                    <Typography
                      variant="body"
                      color="text.primary"
                      sx={{
                        fontSize: 16,
                      }}
                    >
                      {user.phone}
                    </Typography>
                  </Box>
                  <br />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <ContactMailIcon
                      sx={{ color: "rgb(36 24 64)", mr: 1, my: 0.5 }}
                    />
                    <Typography
                      variant="body"
                      color="text.primary"
                      sx={{
                        fontSize: 16,
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <HomeIcon sx={{ color: "rgb(36 24 64)", mr: 1, my: 0.5 }} />
                    <Typography
                      variant="body"
                      color="text.primary"
                      sx={{
                        fontSize: 16,
                      }}
                    >
                      {user.dir}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      paddingBottom: "10vh",
                    }}
                  >
                    <HomeIcon sx={{ color: "rgb(36 24 64)", mr: 1, my: 0.5 }} />
                    <TextField
                      onChange={(e) => setDireccion(e.target.value)}
                      color="secondary"
                      id="input-with-sx"
                      label="Elija otra dirección..."
                      variant="standard"
                    />
                  </Box>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {!loading ? (
                    <Button
                      disabled={cart.length === 0}
                      variant="contained"
                      endIcon={<SendIcon />}
                      type="submit"
                      color="secondary"
                      sx={{ color: "white" }}
                    >
                      Enviar
                    </Button>
                  ) : (
                    <Button
                      // disabled
                      variant="contained"
                      color="secondary"
                      sx={{ color: "white" }}
                    >
                      Espere...
                    </Button>
                  )}
                </form>
              </>
            ) : (
              <Grid sx={{ padding: "10vh 0" }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: 25, fontWeight: "bold", padding: "5px" }}
                >
                  {!error
                    ? "Su pedido esta siendo procesado"
                    : "Hubo un error al procesar los datos"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 19, fontWeight: "bold", padding: "5px" }}
                >
                  {!error
                    ? "Muchas gracias por su compra"
                    : "Intente nuevamente en un instante"}
                </Typography>
                <br />
                {!idCompra ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 20, fontWeight: "bold", padding: "5px" }}
                  >
                    {!error ? "Numero de orden de compra: " + idCompra : ""}
                  </Typography>
                )}

                <br />
                <br />
                <img src={logo} alt="logo" width={100} height={75} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
