const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

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

  MongoDBService();

  const MongoSession = session({
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
  });

  module.exports = {
    //MongoDBService,
    MongoSession,
  };
}
