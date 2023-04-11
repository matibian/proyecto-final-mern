import React, { useState } from "react";
import { socket } from "./Socket";
import { useUser } from "../../context/UserContext";
import { MDBBtn, MDBCardFooter, MDBInputGroup } from "mdb-react-ui-kit";

export function MyForm() {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    let data = { message: value, username: user.email, from: user.email };
    setIsLoading(true);
    socket.timeout(50).emit("msg", data, () => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <MDBCardFooter className="text-muted justify-content-start align-items-center p-3">
        <MDBInputGroup className="mb-0" style={{ display: "inline" }}>
          <form onSubmit={onSubmit}>
            <input
              onChange={(e) => setValue(e.target.value)}
              className="form-control"
              type="text"
            />
            <MDBBtn
              color="#979797"
              style={{ paddingTop: ".55 rem", width: "100%" }}
              type="submit"
              disabled={isLoading}
            >
              Enviar
            </MDBBtn>
          </form>
        </MDBInputGroup>
      </MDBCardFooter>
    </>
    // <form onSubmit={onSubmit}>
    //   <input onChange={(e) => setValue(e.target.value)} />

    //   <button type="submit" disabled={isLoading}>
    //     Enviar
    //   </button>
    // </form>
  );
}
