const express = require("express");
const passport = require("passport");
const { engine } = require("express-handlebars");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const websocket = require("./service/chat.js");
const routerCart = require("./routes/cart");
const routerProducts = require("./routes/products");
const routerAdmin = require("./routes/admin");

const { MongoSession, MongoDBService } = require("./config/services");
// MongoDBService();

if (process.argv[3] !== "dev") {
  app.use(MongoSession);
  app.use(passport.initialize());
  app.use(passport.session());
}

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");
app.set("views", "./views/layouts");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/admin", routerAdmin);

websocket(io);

httpServer.listen(config.PORT, () =>
  console.log(`App listening on http://${config.HOST}:${config.PORT}`)
);
