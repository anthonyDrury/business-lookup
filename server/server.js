const express = require("express");
const app = express();
const port = 5000;
const request = require("request");

const cors = require("cors");
app.use(cors());

const GUID = process.env.GUID;

if (GUID === undefined || GUID === "") {
  console.log(
    'WARNING: You did not set the ABR GUID, stop the server and export with GUID="GUID_HERE"'
  );
}

app.get("/abn", (req, res) => {
  if (req.query.ABN === undefined) {
    res.status(500).send({ error: "No parameter ABN" });
  }

  request(
    `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${req.query.ABN}&guid=${GUID}`
  ).pipe(res);
});

app.get("/acn", (req, res) => {
  if (req.query.ACN === undefined) {
    res.status(500).send({ error: "No parameter ACN" });
  }

  request(
    `https://abr.business.gov.au/json/AcnDetails.aspx?acn=${req.query.ACN}&guid=${GUID}`
  ).pipe(res);
});

app.get("/name", (req, res) => {
  if (req.query.name === undefined) {
    res.status(500).send({ error: "No parameter name" });
  }

  request(
    `https://abr.business.gov.au/json/MatchingNames.aspx?name=${req.query.name}&guid=${GUID}`
  ).pipe(res);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
