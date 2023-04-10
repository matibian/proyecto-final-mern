import * as React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function MyOrders({ usermail }) {
  const { logout } = useAuth;
  const { user } = useUser();
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/orders/" + usermail, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        logout();
      });
  }, [user]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nº Orden</TableCell>
            <TableCell align="center">Dirección</TableCell>
            <TableCell align="center">Envío</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.ordernumber}
                  </TableCell>
                  <TableCell align="center">{row.buyer.address}</TableCell>
                  <TableCell align="center">
                    ${row.envio.toLocaleString("de-DE")}
                  </TableCell>
                  <TableCell align="center">
                    ${row.total.toLocaleString("de-DE")}
                  </TableCell>
                </TableRow>
              ))
            : "No hay pedidos todavía"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
