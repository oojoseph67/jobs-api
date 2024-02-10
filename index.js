require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

{
  /**SWAGGER UI */
}

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

{
  /**SWAGGER UI */
}

// route imports
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// connectDB
const connectDB = require("./db/index");

// authentication middleware
const authenticateUser = require("./middleware/authentication");

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
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);

app.use(helmet());
app.use(xss());

// routes
app.get("/", (req, res) => {
  res.send('<h1>JOBS API</h1><a href="/api/docs">DOCUMENTATION </a>');
});

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

{
  /** PATH UPDATE FOR SWAGGER API */
}

//  /user/{id}:
//     parameters:
//       - in: path
//         name: id
//         schema:
//           type: integer
//         required: true
//         description: The user ID
