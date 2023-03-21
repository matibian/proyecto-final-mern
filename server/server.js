const express = require("express");
const passport = require("passport");
const { engine } = require("express-handlebars");
const app = express();
const config = require("./config/config");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const routerCart = require("./routes/cart");
const websocket = require("./service/chat.js");
const { MongoSession, MongoDBService } = require("./config/services");
const routerProducts = require("./routes/products");

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

MongoDBService();

app.use(MongoSession);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

websocket(io);

httpServer.listen(config.PORT, () =>
  console.log(`App listening on http://${config.HOST}:${config.PORT}`)
);
