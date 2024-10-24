const express = require("express");
const bodyParser = require("body-parser");
const downloadPageAsPDF = require("./browser");

const app = express();

app.use(bodyParser.json());

app.post("/api/render", async (req, res) => {
  const url = req.body.url;

  const goto = req.body.goto || {};
  const pdf = req.body.pdf || {};

  const buffer = await downloadPageAsPDF(url, goto, pdf);

  res.contentType("application/pdf");
  res.send(buffer);
});

app.get("/api/render", async (req, res) => {
  const url = req.query.url;

  const goto = req.query.goto || {};
  const pdf = req.query.pdf || {};

  const buffer = await downloadPageAsPDF(url, goto, pdf);

  res.contentType("application/pdf");
  res.send(buffer);
});

module.exports = app;
