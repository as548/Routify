const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config("./config.env");
const connectDatabase = () => {
  mongoose
    .connect(
        process.env.DB_URI,
      {useUnifiedTopology: true
      useCreateIndex: true,
      useFindAndModify: false, }
    )
    .then((data) => {
      console.log(`MongoDb connected with server: ${data.connection.host}`);
    });
};
module.exports = connectDatabase;
