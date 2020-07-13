const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const { body, check, validationResult } = require('express-validator');

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
// const coins = CoinGeckoClient.coins;

//=================================
//             Stock
//=================================

router.get("/chart/:symbol", async (req, res) => {
    // TODO: need to set timeout
    let params = {
        days: 7,
        vs_currency: 'cad'
    }
    const coinId = req.params.symbol;
    let info = await CoinGeckoClient.coins.fetchMarketChart(coinId, params);
    
    // format for react-vis
    info.data.prices = info.data.prices.map(item => {
        return {'x': item[0], 'y': item[1]}
    })
    info.data.market_caps = info.data.market_caps.map(item => {
        return {'x': item[0], 'y': item[1]}
    })
    info.data.total_volumes = info.data.total_volumes.map(item => {
        return {'x': item[0], 'y': item[1]}
    })
    res.status(200).json({
        'crypto': req.params.symbol,
        'info': info
    });
});
router.get("/price/:symbol", async (req, res) => {
    // TODO: need to set timeout
    const coinId = req.params.symbol;
    const params = {
        ids: [coinId],
        vs_currencies: ['cad', 'usd'],
        include_last_updated_at: true
    }
    let info = await CoinGeckoClient.simple.price(params);
    res.status(200).json({
        'crypto': req.params.symbol,
        'info': info
    });
});

/* Get all symbols */
router.get('/list', async (req, res) => {
    let info = await CoinGeckoClient.coins.list();
    // each item in data.data needs key for react DOM
    info.data = info.data.map((item, idx) => {
        return {...item, 'key' :idx}
    })
    res.status(200).json({
        'info': info
    })
})

module.exports = router;
