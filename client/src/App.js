import "./App.css";
import React from "react";
import Footer from "./components/Footer";
import ItemListContainerCarrousel from "./components/carrousel/ItemListContainerCarrousel";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/Grid/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";
import CheckOut from "./components/CheckOut";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar/NavBar";
import Cuenta from "./components/cuenta/Cuenta";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    secondary: {
      main: "rgb(201 160 155)",
    },
  },
});

export default function App() {
  console.log("Proyecto Final del curso de Backend para CODERHOSE");
  console.log("Por Matias Bianchi");

  return (
    <UserProvider>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <ItemListContainerCarrousel />
                  </>
                }
              />
              <Route path="/category/all" element={<ItemListContainer />} />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route
                path="/category/:category"
                element={<ItemListContainer />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/cuenta" element={<Cuenta />} />
              {/* <Route path="/mis_pedidos/:id" element={<OrdersContainer />} /> */}
            </Routes>
            <Footer />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </UserProvider>
  );
}
