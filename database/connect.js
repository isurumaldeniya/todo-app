require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = (mongoURI) => {
  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = connectDB;
