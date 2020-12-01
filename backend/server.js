const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./authentication/user.route"); //bring in our user routes

const app = express();

app.use(cors()); // configure cors
app.use(bodyParser.urlencoded({ extended: true })); //configure body parser
app.use(bodyParser.json());

app.use(morgan("dev")); // configire morgan

require("./config/database.config")(app);

const PORT = process.env.PORT || 4000;

app.use("/api/authentication", userRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
