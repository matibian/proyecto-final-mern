import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export default function ItemDetailContainer() {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/products/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductDetail(data);
      })
      .then(setLoading(true))
      // const products = category ? query(collection(db, "products"), where ("category", "==", category)) :collection(db, "products")
      // getDocs(products)
      //     .then((res) => {
      //         const list = res.docs.map((product) => {
      //             return {
      //                 id: product.id,
      //                 ...product.data()
      //             }
      //         })
      //         setItems(list)
      //     })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  //   const productCollection = collection(db, "products")
  //   const referenceDoc = doc(productCollection, id)

  //   getDoc(referenceDoc)
  //     .then((res) => {
  //       setProductDetail({
  //         id:res.id,
  //         ...res.data()
  //       })
  //   })

  //     .catch(() => console.log("error"))
  //     .finally(() => setLoading(false))
  // }, [id])

  return (
    <>
      <div style={{ height: "73vh", overflowY: "scroll" }}>
        <ItemDetail productDetail={productDetail} loading={loading} />
      </div>
    </>
  );
}
