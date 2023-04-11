import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const { id } = useParams();
  const BASE_HOST = process.env.REACT_APP_BASE_HOST;

  useEffect(() => {
    fetch(BASE_HOST + `/api/products/id/` + id, auth)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
