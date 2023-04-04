import * as React from "react";
import { useEffect, useState } from "react";
import Orders from "./Orders";
import { useAuth } from "../../context/AuthContext";

export default function MyOrders(usermail) {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/orders/" + usermail, auth)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Orden</th>
            <th scope="col">Dirección</th>
            <th scope="col">Envío</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order._id}>
              <Orders order={order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
