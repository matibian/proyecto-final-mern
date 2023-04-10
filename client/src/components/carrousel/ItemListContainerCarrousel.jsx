import React, { useState, useEffect } from "react";
import ItemListCarrousel from "./ItemListCarrousel";
import Error from "../Grid/Error";
import { useAuth } from "../../context/AuthContext";

export default function ItemListContainerCarrousel() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // fetch("http://127.0.0.1:8080/api/products")
  //   .then((response) => response.json())
  //   .then((data) => setItems(data));

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .then(setLoading(true))
      .catch((err) => {
        setError(err);
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div id="carrousel" sx={{ padding: 5 }}>
        <span id="arrivals">Novedades</span>
        {!error ? (
          <ItemListCarrousel items={items} loading={loading} />
        ) : (
          <Error />
        )}
      </div>
    </>
  );
}
