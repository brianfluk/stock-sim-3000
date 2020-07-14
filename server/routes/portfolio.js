const express = require('express');
const router = express.Router();
const { Portfolio } = require("../models/Portfolio");
const { User } = require("../models/User");
const { Transaction } = require("../models/Transaction");
const { check, body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const { auth } = require("../middleware/auth");

//=================================
//             Portfolio
//=================================

// TODO: sanitization

// create portfolio

/* for prod: */
// router.post('/create', auth, (req, res) => {
/* for testing: */
router.post('/create', (req, res) => {
    let portfolio = new Portfolio(req.body)
    
    /* for testing: string --> ObjectId */
    portfolio.userId = mongoose.Types.ObjectId(req.body.userId)

    /* for prod: using auth middleware */
    // portfolio.userId = req.user._id;

    portfolio.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
    
})

// get portfolio by user
// router.get('/get-portfolio-by-user', auth, (req, res) => {
router.get('/get-portfolio-by-user', (req, res) => {

    /** prod */
    // let userId = req.user._id
    /** test */
    let userId = mongoose.Types.ObjectId(req.query.id)

    Portfolio.findByUser(userId, (err, portfolio) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(portfolio)
    })
})

//  buy coin on portfolio
/* body: {portfolioId, cashAmt, coinId, vs_currency} */
router.post('/buy-crypto', async (req, res) => {
// router.post('/buy-crypto', auth, async (req, res) => {

    const portfolioId = mongoose.Types.ObjectId(req.body.portfolioId)

    const coinId = req.body.coinId
    const vs_currency = req.body.vs_currency
    const params = {
        ids: [coinId],
        vs_currencies: [vs_currency],
        include_last_updated_at: true
    }
    let coinInfo = await CoinGeckoClient.simple.price(params);
    const coinPrice = Number(coinInfo.data[coinId][vs_currency])
    const useCash = Number(req.body.cashAmt)


    try {
        let portfolio = await Portfolio.findById(portfolioId).lean().exec();
        if (portfolio == null || portfolio == []) {
            return res.status(500).send('No portfolio by id')
        }
        if ( useCash > portfolio.cash) {
            return res.status(500).send('Not enough cash')
        } 
        
        async function calculateNewValues(portfolio, coinPrice, coinId, useCash) {
            const coinAmt = Number(useCash) / Number(coinPrice);
            let newPortfolioCash = Number(portfolio.cash) - Number(useCash)
            let newPortfolioCoins = portfolio.coins
            const currCoinHeld = newPortfolioCoins.filter(obj => {
                return obj.coinId == coinId
            })
            if (currCoinHeld.length == 0) { // none so far
                newPortfolioCoins.push({
                    coinId: coinId,
                    avg: coinPrice,
                    numHeld: coinAmt
                })
            } else { // already exists
                // remove old entry and calculate & push new one
                const oldCoinVals = currCoinHeld[0]
                const removeIdx = newPortfolioCoins.indexOf(oldCoinVals);
                (removeIdx >= 0) && newPortfolioCoins.splice(removeIdx, 1);
                
                const newNumHeld = coinAmt + Number(oldCoinVals.numHeld);
                const newAvg = ((Number(oldCoinVals.numHeld) * Number(oldCoinVals.avg)) + (coinPrice * coinAmt) ) / (Number(oldCoinVals.numHeld) + coinAmt)
                newPortfolioCoins.push({
                    coinId: coinId,
                    avg: newAvg,
                    numHeld: newNumHeld
                })
            }
            return [newPortfolioCash, newPortfolioCoins]
        }
        let [newCash, newCoins] = await calculateNewValues(portfolio, coinPrice, coinId, useCash)

        let newPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, {cash: newCash, coins: newCoins}, {new:true})
        return res.status(200).send(newPortfolio)
    } catch(err) {
        return res.status(500).json(err)
    }

    // add transaction


})

// sell coin on portfolio
router.post('/sell-crypto', async (req,res) => {
// router.post('/sell-crypto', auth, (req,res) => {

    const portfolioId = mongoose.Types.ObjectId(req.body.portfolioId)
    const coinId = req.body.coinId
    const vs_currency = req.body.vs_currency
    const params = {
        ids: [coinId],
        vs_currencies: [vs_currency],
        include_last_updated_at: true
    }
    let coinInfo = await CoinGeckoClient.simple.price(params);
    const coinPrice = Number(coinInfo.data[coinId][vs_currency])

    const coinAmt = Number(req.body.coinAmt)


    try {
        let portfolio = await Portfolio.findById(portfolioId).lean().exec();
        if (portfolio == null || portfolio == []) {
            return res.status(500).send('No portfolio by id')
        }
        const heldCoins = portfolio.coins.filter(obj => { return obj.coinId == coinId })
        if (heldCoins.length == 0) {
            return res.status(500).send("Don't own this coin")
        }
        if (coinAmt > Number(heldCoins[0].numHeld)) {
            return res.status(500).send(`Trying to sell ${coinAmt} but only have ${Number(heldCoins[0].numHeld)}`)
        } // maybe have option to sell max though, but could be a front end feature instead

        async function calculateNewValues(portfolio, coinPrice, coinId, coinAmt) {
            const newPortfolioCash = Number(portfolio.cash) + (coinAmt*coinPrice)
            
            const heldCoin = portfolio.coins.filter(obj => { return obj.coinId == coinId })[0]
            let newPortfolioCoins = portfolio.coins;
            // assume heldCoins check has passed
            const heldIdx = newPortfolioCoins.indexOf(heldCoin)
            if (heldIdx >= 0) {
                if (coinAmt == Number(newPortfolioCoins[heldIdx].numHeld)) {
                    newPortfolioCoins.splice(heldIdx, 1)
                } else if (coinAmt < Number(newPortfolioCoins[heldIdx].numHeld)){ // 
                    newPortfolioCoins[heldIdx]['numHeld'] = Number(newPortfolioCoins[heldIdx]['numHeld']) - coinAmt
                }
            }
            return [newPortfolioCash, newPortfolioCoins]
        }

        const [newCash, newCoins] = await calculateNewValues(portfolio, coinPrice, coinId, coinAmt)
        let newPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, {cash: newCash, coins: newCoins}, {new:true})
        return res.status(200).send(newPortfolio)

    } catch(err) {
        return res.status(500).json(err)
    }

})

// buy stock - target price, cash amt, have option to buy less if price goes up


// retrieve balances of portfolio
router.get("/get-balances", auth, (req, res) => {
    
});

module.exports = router;
