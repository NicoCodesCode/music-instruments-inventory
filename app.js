require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const indexRouter = require("./routes/indexRouter");
const instrumentsRouter = require("./routes/instrumentsRouter");
const modelsRouter = require("./routes/modelsRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/instruments", instrumentsRouter);
app.use("/models", modelsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render("error", { title: "Error", message: "Something Went Wrong :C" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
