const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./database/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// require('./database/connect'); //since function is executed in the module we dont need to export it from the module

require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

const app = express();

//middlwares
app.use(express.static("./public"));
app.use(express.json()); //body-parser

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(mongoURI);

    //we first need to make sure db connection is okay before starting the application
    app.listen(port, () => {
      console.log(`Server is listen on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
