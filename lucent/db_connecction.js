const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/renterHub")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("faiiled to connect with database ");
  });

