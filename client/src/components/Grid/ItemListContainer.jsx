import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";
import ItemList from "./ItemList";
import { useAuth } from "../../context/AuthContext";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const [error, setError] = useState(false);
  const { logout } = useAuth();

  //firebase

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8080/api/products/${category ? category : ""}`, {
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
  }, [category]);

  return (
    <div style={{ height: "75vh", overflowY: "scroll" }}>
      {!error ? <ItemList items={items} loading={loading} /> : <Error />}
    </div>
  );
}
