import React, { useState } from "react";
import { socket } from "./Socket";
import { useUser } from "../../context/UserContext";

export function MyForm() {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    console.log(user);
    event.preventDefault();
    let data = { message: value, username: user.email };
    console.log(data);
    setIsLoading(true);
    socket.timeout(50).emit("msg", data, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Enviar
      </button>
    </form>
  );
}
