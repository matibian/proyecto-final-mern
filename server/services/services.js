import mongoose from "mongoose";

const init = async () => {
  try {
    mongoose.connect(proces.env.DATABASE_CONNECTION_STRING, {
      useNewUrlParser: true,
    });
    console.log("Conectado a MONGODB");
  } catch (error) {
    console.log(error);
  }
};

const MongoDBService = {
  init,
};

export default MongoDBService;
