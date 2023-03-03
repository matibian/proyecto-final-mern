import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Orders from './Orders';

export default function OrdersContainer() {


    const [orderDetail, setOrderDetail] = useState({})

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id } = useParams()

    useEffect(() => {
        const orderCollection = collection(db, "orders")
        const referenceDoc = doc(orderCollection, id)

        getDoc(referenceDoc)
            .then((res) => {
                setOrderDetail({
                    id: res.id,
                    ...res.data()
                })
                setLoading(false)
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, [id])

    

    return (
        <>
            <div style={{ height: "73vh", overflowY: "scroll" }}>
                <Orders orderDetail={orderDetail} loading={loading} error={error} />
            </div>
        </>
    )
}
