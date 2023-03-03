import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Error from './Error';

export default function ItemListContainer() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false);
    const { category } = useParams()
    const [error, setError] = useState(false);


    //firebase

    useEffect(() => {
        setLoading(true)
        const products = category ? query(collection(db, "products"), where ("category", "==", category)) :collection(db, "products")
        getDocs(products)
            .then((res) => {
                const list = res.docs.map((product) => {
                    return {
                        id: product.id,
                        ...product.data()
                    }
                })
                setItems(list)
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false))

    }, [category])



    return (
        <div style={{ height: "75vh", overflowY: "scroll" }}>
            {!error
            ?<ItemList items={items} loading={loading} />
            : <Error />}
        </div>
    )
}


