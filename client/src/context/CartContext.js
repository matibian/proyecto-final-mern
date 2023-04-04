import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [envio, setEnvio] = useState(0);
  const [discount, setDiscount] = useState(false);

  // useEffect(() => {
  //   fetch("https://localhost:3000/api/cart")
  //     .then((response) => response.json())
  //     .then((products) => setCart(products));
  // }, []);

  const addItem = (item) => {
    const existInCart = cart.find((prod) => prod._id === item._id);
    if (existInCart) {
      const updateCart = cart.map((prod) => {
        if (prod._id === item._id && prod.quantity < prod.stock) {
          return { ...prod, quantity: prod.quantity + item.quantity };
        } else {
          return prod;
        }
      });
      setCart(updateCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    return 1;
  };

  const removeItem = (_id) => {
    setCart(cart.filter((prod) => prod._id !== _id));
  };

  const isInCart = (_id) => {
    return cart.some((prod) => prod._id === _id);
  };

  const cartQuantity = () => {
    return cart.reduce((acum, prod) => (acum += prod.quantity), 0);
  };

  const cartTotal = () => {
    return cart.reduce((acum, prod) => (acum += prod.price * prod.quantity), 0);
  };

  const delivery = (add) => {
    return setEnvio(add);
  };

  const descuento = (set) => {
    return setDiscount(set);
  };

  const sumItem = (item) => {
    const updateItem = cart.map((prod) => {
      if (prod._id === item._id && prod.quantity < item.stock) {
        return { ...prod, quantity: prod.quantity + 1 };
      } else {
        return prod;
      }
    });
    setCart(updateItem);
  };

  const reduceItem = (item) => {
    const updateItem = cart.map((prod) => {
      if (prod._id === item._id) {
        return { ...prod, quantity: prod.quantity - 1 };
      } else {
        return prod;
      }
    });
    setCart(updateItem);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        descuento,
        discount,
        clear,
        envio,
        delivery,
        removeItem,
        isInCart,
        sumItem,
        reduceItem,
        addItem,
        cartTotal,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
