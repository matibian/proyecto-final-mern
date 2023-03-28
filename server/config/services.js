const mongoose = require("mongoose");

const cookieSession = require("cookie-session");
const MongoStore = require("connect-mongo");
require("dotenv");

mongoose.set("strictQuery", true);

modo = process.argv[3];

// const sessionStore = MongoStore.create({
//   mongoUrl: process.env.MONGO_URI,
//   mongoOptions: { usesNewUrlParser: true, useUnifiedTopology: true },
//   ttl: 20000,
// });

const MongoSession = {
  name: "session-vortex",
  secret: process.env.MONGODB_SECRET,
  autoRemove: "native",
  cookie: { maxAge: 2000000, httpOnly: true, signed: true, sameSite: false },
  saveUninitialized: true,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: "sessions",
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 2000000,
  }),
};

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
  // const MongoSession = session({
  //   store: MongoStore.create({
  //     mongoUrl:
  //       "mongodb+srv://matubianchi:Coderhouse123456@cluster0.u37xyzn.mongodb.net/Proyecto-back",
  //     mongoOptions: {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     },
  //     ttl: 10 * 60,
  //   }),
  //   secret: "secreto",
  //   resave: false,
  //   saveUninitialized: false,
  // });

  // // const cookie = cookieSession({
  // //   name: "vortex-session",
  // //   secret: "process.env.JWT_SECRET", // should use as secret environment variable
  // //   httpOnly: true,
  // // });

  module.exports = {
    MongoDBService,
    MongoSession,
    // cookie,
  };
}
