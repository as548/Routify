const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const URL = require("./models/urlModel");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://routify-tau.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const user = require("./routes/userRoutes");
const url = require("./routes/urlRoutes");

app.use("/api/v1", user);
app.use("/api/v1", url);

app.get("/api/v1/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware);

module.exports = app;
