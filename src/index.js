require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT;
const authRouter = require("./routes/AuthRouter");
const categoryRouter = require("./routes/CategoriesRouter");
const manufacturerRouter = require("./routes/ManufacturerRouter");
const productRouter = require("./routes/ProductRouter");
const orderRouter = require("./routes/OrderRouter");
const publicRouter = require("./routes/PublicRouter");
const uploadRouter = require("./routes/UploadRouter");

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
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/public", publicRouter);
app.use("/uploads", uploadRouter);
