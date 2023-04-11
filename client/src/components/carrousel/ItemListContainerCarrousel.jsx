import React, { useState, useEffect } from "react";
import ItemListCarrousel from "./ItemListCarrousel";
import Error from "../Grid/Error";
import { useAuth } from "../../context/AuthContext";
const BASE_HOST = process.env.REACT_APP_BASE_HOST;

export default function ItemListContainerCarrousel() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(BASE_HOST + "/api/products", {
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
