require("dotenv").config();
const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const instrumentsRouter = require("./routes/instrumentsRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/instruments", instrumentsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render("error", { title: "Error", message: "Internal Server Error :C" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
