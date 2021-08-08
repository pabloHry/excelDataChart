const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const XLSX = require("xlsx");
const excel = XLSX.readFile(
  "./Kawarizmi - Reporting campaign interne _ Exemple - Sour.xlsx"
);
const PORT = process.env.PORT || 3001;

const exelSheet = excel.SheetNames;
let data = XLSX.utils.sheet_to_json(excel.Sheets[exelSheet[0]]);
const dataMay = [];
const dataJune = [];

for (let i = 0; i < 2671; i++) {
  const juif = data[i];
  dataMay.push({
    clicks: juif.clicks,
    total_spend: juif.total_spend,
    impressions: juif.impressions,
  });
}

for (let i = 2671; i < 4231; i++) {
  const juif = data[i];
  dataJune.push({
    clicks: juif.clicks,
    total_spend: juif.total_spend,
    impressions: juif.impressions,
  });
}

let sumImpressionsMay = 0;
let sumImpressionsJune = 0;
let sumClickMay = 0;
let sumClickJune = 0;
let sumSpendMay = 0;
let sumSpendJune = 0;

dataMay.map((item) => (sumImpressionsMay += item.impressions));
dataJune.map((item) => (sumImpressionsJune += item.impressions));
dataMay.map((item) => (sumClickMay += item.clicks));
dataJune.map((item) => (sumClickJune += item.clicks));
dataMay.map((item) => (sumSpendMay += item.total_spend));
dataJune.map((item) => (sumSpendJune += item.total_spend));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.get("/api/fdp", (req, res) => {
  res.send({
    sumImpressionsMay: sumImpressionsMay,
    sumImpressionsJune: sumImpressionsJune,
    sumClickMay: sumClickMay,
    sumClickJune: sumClickJune,
  });
});

app.listen(PORT, () => {
  console.log(`bite ${PORT}`);
});
