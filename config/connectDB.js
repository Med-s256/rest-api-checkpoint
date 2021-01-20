const mongoose = require("mongoose");

function connectDB() {
  const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.MONGO_URL, option)
    .then(() => {
      console.log("the database is connected ...");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connectDB;
