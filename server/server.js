const express = require("express");
const { Router } = express;
const ContenedorMsg = require("./contenedores/contenedorMsjArchivo");
const app = express();
const session = require("express-session");
const authRouter = require("./routes/auth.js");
const productRouter = require("./routes/products.js");
const cartRouter = require("./routes/cart.js");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("./config/config");
const httpServer = require("http").createServer(app);

httpServer.listen(config.PORT, () =>
  console.log(`App listening on http://${config.HOST}:${config.PORT}`)
);

// const io = require("socket.io")(httpServer);

const Usuarios = require("./models/usuarios");

app.use(express.static(__dirname + "/public"));

///////passport/////////
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
});

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  url: process.env.DATABASE_CONNECTION_STRING,
  collection: "logins",
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://matubianchi:1234@cluster0.u37xyzn.mongodb.net/Proyecto-back",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 10 * 60,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("No existe el usuario " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Password inválido");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error en el logueo: " + err);
          return done(err);
        }

        if (user) {
          console.log("Ya existe el usuario");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error al guardar el usuario: " + err);
            return done(err);
          }
          console.log(user);
          console.log("Registración exitosa");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

/////////// SESION //////////

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://matubianchi:1234@cluster0.u37xyzn.mongodb.net/Proyecto-back",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 10 * 60,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// function auth(req, res, next) {
//   if (req.session.user) {
//     return next();
//   } else {
//     // res.status(401).send("error de autorización!")
//     return res.redirect("/login");

//   }
// }

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

// ROUTERS
app.use("/", checkAuthentication, authRouter);
app.use("/api/products", checkAuthentication, productRouter);
app.use("/api/cart", checkAuthentication, cartRouter);

// Normalizr

// const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
// const messageSchema = new schema.Entity("messages", {
//   author: authorSchema,
// });

// const chatSchema = new schema.Entity("chats", {
//   messages: [messageSchema],
// });

// const normalizarData = (data) => {
//   const dataNormalizada = normalize(
//     { id: "chatHistory", messages: data },
//     chatSchema
//   );
//   return dataNormalizada;
// };

// const normalizarMensajes = async () => {
//   const messages = await contenedorMsg.getAll();
//   const normalizedMessages = normalizarData(messages);
//   return normalizedMessages;
// };

///// Conexion socket

// io.on("connection", async (socket) => {
//   console.log(`Nuevo cliente conectado ${socket.id}`);

//   socket.emit("product-list", await contenedor.getAll());

//   socket.emit("msg-list", await normalizarMensajes());

//   socket.on("product", async (data) => {
//     console.log(data);

//     await contenedor.save(data);

//     console.log("Se recibio un producto nuevo", "producto:", data);

//     io.emit("product-list", await contenedor.getAll());
//   });

//   socket.on("del-product", async (data) => {
//     console.log(data);

//     await contenedor.deleteById(data);
//     io.emit("product-list", await contenedor.getAll());
//   });

//   socket.on("msg", async (data) => {
//     await contenedorMsg.save({
//       socketid: socket.id,
//       timestamp: timestamp,
//       ...data,
//     });

//     console.log("Se recibio un msg nuevo", "msg:", data);

//     io.emit("msg-list", await normalizarMensajes());
//   });
// });
