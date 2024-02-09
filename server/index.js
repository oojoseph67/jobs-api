require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

// route imports
const authRouter = require('./routes/auth')
const jobsRouter = require("./routes/jobs");

// connectDB
const connectDB = require('./db/index')

// authentication middleware
const authenticateUser = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(
  cors({
    origin: "*", // or '*' to allow all origins
  })
);
app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use('/api/v1/auth', authRouter)
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
