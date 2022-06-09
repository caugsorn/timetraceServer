require("dotenv").config();
// console.log(process.env);
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const userRoute = require("./routes/userRoutes");

const notFoundMiddleWare = require("./middlewares/notFound");
const errorMiddleWare = require("./middlewares/error");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoute);
// app.use("/logs");
// app.use("/reports");

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 8000;
// sequelize.sync({ force: true }).then(() => console.log("DATABASE SYNC"))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
