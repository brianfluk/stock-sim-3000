const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
// const coins = CoinGeckoClient.coins;

//=================================
//             Stock
//=================================

// FOR PROD: router.get("/stock", auth, (req, res) => {
router.get("/chart/:symbol", async (req, res) => {
    // TODO: need to set timeout
    let data = await CoinGeckoClient.coins.fetchMarketChart('bitcoin');
    console.log(data)
    res.status(200).json({
        'crypto': req.params.symbol,
        'data': data
    });
});

/* Get all symbols */
router.get('/list', async (req, res) => {
    let data = await CoinGeckoClient.coins.list();
    res.status(200).json({
        'data': data
    })
})

module.exports = router;
