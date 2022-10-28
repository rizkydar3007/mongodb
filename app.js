const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/mongoose");
const productRouter = require("./app/product/routes");
const productRouterv2 = require("./app/product_v2/routes");
const path = require("path");

// const corsOption = {
//     origin: ['https://www.google.com'],
// };
// app.use(cors(corsOption));
app.use(cors());
// const logger = require("morgan");
// app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", productRouter);
app.use("/api/v2", productRouterv2);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource " + req.originalUrl + " not found!",
  });
});

const { HOST, PORT } = process.env;

app.listen(PORT, () => {
  console.log(`${HOST}${PORT}`);
});
