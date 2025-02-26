const express = require("express");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

const apiRoutes = require("./routes/apiRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
const allowedOrigins = [
  process.env.NODE_CLIENT ? process.env.NODE_CLIENT : `http://localhost:5174`,
];
// console.log(allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", async (req, res, next) => {
  res.json({ message: "API running..." });
});

//mongodb connection
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  console.error(`error occured ${error}`);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
