const mongoose = require("mongoose");
const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const cookieSession = require("cookie-session");
const MongoStore = require("connect-mongo");
require("dotenv");

mongoose.set("strictQuery", true);

modo = process.argv[3];

if (modo == "prod" || modo == null) {
  const MongoDBService = async () => {
    try {
      mongoose.connect(
        `mongodb+srv://${process.env.USERMONGO}:${process.env.PASSMONGO}@cluster0.u37xyzn.mongodb.net/Proyecto-back`,
        { useNewUrlParser: true }
      );
      console.log("Conectado a MONGODB");
    } catch (error) {
      console.log(error);
    }
  };

  // const mongoDBstore = new MongoDBStore({
  //   uri: `mongodb+srv://${process.env.USERMONGO}:${process.env.PASSMONGO}@cluster0.u37xyzn.mongodb.net/Proyecto-back`,
  //   collection: "mySessions",
  // });

  const MongoSession = session({
    name: "session-vortex",
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.USERMONGO}:${process.env.PASSMONGO}@cluster0.u37xyzn.mongodb.net/Proyecto-back`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 1000 * 60 * 10,
      sameSite: false,
      secure: false,
    },
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
  });

  const cookie = cookieSession({
    name: "vortex-session",
    secret: "process.env.JWT_SECRET", // should use as secret environment variable
    httpOnly: true,
  });

  module.exports = {
    MongoDBService,
    MongoSession,
    cookie,
  };
}
