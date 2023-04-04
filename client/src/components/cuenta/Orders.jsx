import React from "react";

export default function Orders({ order }) {
  return (
    <>
      <td>{order.ordernumber} </td>
      <td>{order.buyer.address} </td>
      <td>{order.envio} </td>
      <td>${order.total}</td>
    </>
  );
}
