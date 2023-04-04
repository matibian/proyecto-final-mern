import React, { useEffect, useRef, useState } from "react";

import { MyForm } from "./MyForm";
import { socket } from "./Socket";
// import { useUser } from "../../context/UserContext";

// "undefined" means the URL will be computed from the `window.location` object

// function ConnectionState({ isConnected }) {
//   return <p>State: {"" + isConnected}</p>;
// }
// function ConnectionManager() {
//   function connect() {
//     socket.connect();
//   }

//   function disconnect() {
//     socket.disconnect();
//   }

//   return (
//     <>
//       <button onClick={connect}>Connect</button>
//       <button onClick={disconnect}>Disconnect</button>
//     </>
//   );
// }

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgEvents, setMsgEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMsgEvent(value) {
      setMsgEvents(value);
    }

    socket.on("connection", onConnect);
    socket.on("msg-list", onMsgEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("msg", onMsgEvent);
    };
  }, []);

  function Events({ events }) {
    return (
      <ul>
        {events.map((event, index) => {
          return (
            <li key={index}>
              <div className="p-email">
                <span sx="font-weight: bolder; color: blue">
                  {event.username}
                </span>
                <span style={{ color: "red" }}>
                  [{event.timestamp}] :
                  <div sx="color:green">{event.message}</div>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="App">
      {/* <ConnectionState isConnected={isConnected} /> */}
      <Events events={msgEvents} />
      {/* <ConnectionManager /> */}
      <MyForm />
    </div>
  );
}
