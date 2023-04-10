import * as React from "react";
import Grid from "@mui/material/Grid";
import logo from "../images/logofashion.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer" style={{ display: "flex", paddingTop: "3vh" }}>
      <Grid container spacing={2} columns={4} sx={{ justifyContent: "center" }}>
        <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={1}>
          <div style={{ textAlign: "end", paddingRight: "10vh" }}>
            <h5 onClick={() => navigate(`/`)} style={{ cursor: "pointer" }}>
              Home
            </h5>
            <ul style={{ listStyleType: "none" }}>
              <li
                onClick={() => navigate(`category/Camisas`)}
                style={{ cursor: "pointer" }}
              >
                Camisas
              </li>
              <li
                onClick={() => navigate(`category/Pantalones`)}
                style={{ cursor: "pointer" }}
              >
                Pantalones
              </li>
              <li
                onClick={() => navigate(`category/Accesorios`)}
                style={{ cursor: "pointer" }}
              >
                Accesorios
              </li>
              <li
                onClick={() => navigate(`category/all`)}
                style={{ cursor: "pointer" }}
              >
                Todo
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={4} sm={1} sx={{ justifyContent: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Redes sociales
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gridColumnGap: "8%",
              padding: "2vh 0",
            }}
          >
            <Link href="https://www.facebook.com/" color="inherit">
              <FacebookIcon sx={{ fontSize: "50px" }} />
            </Link>
            <Link href="/https://www.whatsapp.com/" color="inherit">
              <WhatsAppIcon id="whatsapp" sx={{ fontSize: "50px" }} />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <TwitterIcon id="twitter" sx={{ fontSize: "50px" }} />
            </Link>
          </div>
        </Grid>
        <Grid item xs={4} sm={1} sx={{ justifyContent: "center" }}>
          <div style={{ marginTop: "-25px" }}>
            <img src={logo} alt="logo" width={200} height={200} />
          </div>
        </Grid>
        <Grid
          item
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          sm={1}
        >
          <div>
            <TextField
              label="Contactanos"
              variant="standard"
              color="secondary"
            />
            <br />
            <TextField
              label="Suscribite al newsletter"
              variant="standard"
              color="secondary"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
