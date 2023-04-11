import React, { useEffect, useState } from "react";
import { MyForm } from "./MyForm";
import { socket } from "./Socket";
import logo from "../../images/logofashion.png";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Avatar } from "@mui/material";

export default function Chat() {
  const user = JSON.parse(localStorage.getItem("user")).email;
  const avatar = JSON.parse(localStorage.getItem("user")).avatar;
  const [msgEvents, setMsgEvents] = useState([]);

  useEffect(() => {
    function onMsgEvent(value) {
      setMsgEvents(value);
    }

    async function socketEmit() {
      await socket.emit("user", `${user}`);
      await socket.on("msg-list", onMsgEvent);
    }
    socketEmit();
    return () => {
      socket.off("msg", onMsgEvent);
    };
  }, []);

  function Events({ events }) {
    return (
      <>
        <MDBContainer
          fluid
          style={{
            // backgroundColor: "#eee",
            paddingTop: 0,
            borderRadius: "60%",
          }}
        >
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="12" lg="12" xl="12">
              <MDBCard>
                <MDBCardBody
                  style={{
                    maxHeight: "51vh",
                    overflow: "auto",
                  }}
                >
                  {events?.map((event, index) => {
                    return (
                      <div key={event._id}>
                        {event.from == "Vortex" ? (
                          <>
                            <div className="d-flex justify-content-between">
                              <p className="small mb-1">Vortex</p>
                              <p className="small mb-1 text-muted">
                                {event.timestamp}
                              </p>
                            </div>
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src={logo}
                                alt="avatar vortex"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-3 text-white rounded-3"
                                  style={{ backgroundColor: "#c9a09b" }}
                                >
                                  {event.message}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-between">
                              <p className="small mb-1 text-muted">
                                {event.timestamp}
                              </p>
                              <p className="small mb-1">Vos</p>
                            </div>
                            <div
                              className={
                                event.from === "Vortex"
                                  ? "d-flex flex-row justify-content-start"
                                  : "d-flex flex-row justify-content-end mb-2 pt-1"
                              }
                            >
                              <div>
                                <p
                                  className="small p-2 me-3 mb-3 text-white rounded-3"
                                  style={{ backgroundColor: "#5b5d1b" }}
                                >
                                  {event.message}
                                </p>
                              </div>
                              <Avatar src={avatar} />
                            </div>
                          </>
                        )}
                        <hr className="my-2" />
                      </div>
                    );
                  })}
                </MDBCardBody>
                <MyForm />
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }

  return (
    <div className="App">
      <Events events={msgEvents} />
    </div>
  );
}
