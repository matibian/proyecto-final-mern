import React, { useEffect, useState } from "react";

export default function Prueba() {
  fetch("http://127.0.0.1:8080/auth/prueba")
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  const [session, setSession] = useState("");

  return (
    <>
      <div>Prueba</div>
      <div>{session}</div>
    </>
  );
}
