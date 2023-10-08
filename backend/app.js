const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/", express.static("uploads"));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.use(bodyParser.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Import routes
const user = require("./controller/userController");
const product = require("./controller/productController");
const shop = require("./controller/shopController");
const event = require("./controller/eventController");
const coupon = require("./controller/couponController");
const payment = require("./controller/paymentController");
const order = require("./controller/orderController");
const conversation = require("./controller/conversationController");
const message = require("./controller/messageController");
const withdraw = require("./controller/withdrawController");

app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
app.use("/api/v2/shop", shop);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

app.use(ErrorHandler);

module.exports = app;
