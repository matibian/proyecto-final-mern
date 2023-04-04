import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/products/id/` + id, auth)
      .then((response) => response.json())
      .then((data) => {
        setProductDetail(data);
      })
      .then(setLoading(true))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <div style={{ height: "73vh", overflowY: "scroll" }}>
        <ItemDetail productDetail={productDetail} loading={loading} />
      </div>
    </>
  );
}
