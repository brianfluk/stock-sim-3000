const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");

const config = require("../config/key");
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = config.finnhubAPIKey;
const finnhubClient = new finnhub.DefaultApi()
//=================================
//             Stock
//=================================

// FOR PROD: router.get("/stock", auth, (req, res) => {
router.get("/stock", async (req, res) => {
    finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
        console.log(data)
    });
    res.status(200).json({
        'stock': 'lol'
    });
});

module.exports = router;
