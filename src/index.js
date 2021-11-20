require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT;
const userRouter = require("./routes/UserRouter");
const categoryRouter = require("./routes/CategoryRouter");
const manufacturerRouter = require("./routes/ManufacturerRouter");
const productRouter = require("./routes/ProductRouter");
const orderRouter = require("./routes/OrderRouter");



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my NodeServer!");
});
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
