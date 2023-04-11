import { Avatar } from "@mui/material";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useUser } from "../../context/UserContext";
import Chat from "./Chat";
import MyOrders from "./MyOrders";

export default function Cuenta() {
  const { user } = useUser();

  return (
    <section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          {user.name}
                        </MDBTypography>
                        <Avatar src={user.avatar} />
                      </div>

                      <hr className="my-4" />
                      <div style={{ textAlign: "left" }}>
                        <MDBTypography className="fw-bold mt-2 pt-1">
                          Mail:
                          <span className="fw-bold mb-0 text-black">
                            {user.email}
                          </span>
                        </MDBTypography>

                        <MDBTypography className="fw-bold mt-2 pt-1">
                          Dirección:
                          <span className="fw-bold mb-0 text-black">
                            {user.dir}
                          </span>
                        </MDBTypography>

                        <MDBTypography className="fw-bold mt-2 pt-1">
                          Telefono:
                          <span className="fw-bold mb-0 text-black">
                            {user.phone}
                          </span>
                        </MDBTypography>
                      </div>
                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText
                            tag="a"
                            className="text-body"
                            style={{ cursor: "pointer" }}
                          >
                            Mis pedidos
                          </MDBCardText>
                          <hr className="my-4" />
                          <MyOrders usermail={user.email} />
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-3">
                      <MDBTypography tag="h3" className="fw-bold mt-2 pt-1">
                        Chat
                      </MDBTypography>

                      <Chat user={user} />
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
