const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const cardValidator = require("./routes/cardValidator.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cardValidator);

app.listen(process.env.PORT, () => {
  console.log("Server started at port", process.env.PORT);
});
