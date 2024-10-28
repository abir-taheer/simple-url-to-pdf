const express = require("express");
const bodyParser = require("body-parser");
const downloadPageAsPDF = require("./downloadPageAsPDF");
const securityMiddleware = require("./security");
const cors = require("./cors");
const screenshotPage = require("./screenshotPage");

const app = express();

app.use(cors);
app.use(bodyParser.json());

app.use("/api/render", securityMiddleware);
app.use("/api/screenshot", securityMiddleware);

app.post("/api/render", async (req, res) => {
  const url = req.verifiedUrl;

  const goto = req.body.goto || {};
  const pdf = req.body.pdf || {};

  const buffer = await downloadPageAsPDF(url, goto, pdf);

  res.contentType("application/pdf");
  res.send(buffer);
});

app.get("/api/render", async (req, res) => {
  const url = req.verifiedUrl;

  const goto = req.query.goto || {};
  const pdf = req.query.pdf || {};

  const buffer = await downloadPageAsPDF(url, goto, pdf);

  res.contentType("application/pdf");
  res.send(buffer);
});

app.get("/api/screenshot", async (req, res) => {
  const url = req.verifiedUrl;

  const goto = req.query.goto || {};
  const screenshot = req.query.screenshot || {};

  const buffer = await screenshotPage(url, goto, screenshot);

  res.contentType("image/png");
  res.send(buffer);
});

app.post("/api/screenshot", async (req, res) => {
  const url = req.verifiedUrl;

  const goto = req.body.goto || {};
  const screenshot = req.body.screenshot || {};

  const buffer = await screenshotPage(url, goto, screenshot);

  res.contentType("image/png");
  res.send(buffer);
});

module.exports = app;
