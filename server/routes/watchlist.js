const express = require('express');
const router = express.Router();
const { Watchlist } = require("../models/Watchlist");
const { check, body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const { auth } = require("../middleware/auth");

//=================================
//             Watchlist
//=================================

// get watchlist by user
router.get('/get-watchlist-by-user', auth, async (req, res) => {
    try {
        let watchlists = await Watchlist.find({userId: req.user._id});
        if (watchlists.length == 0) {
            return res.status(200).json([])
        }
        return res.status(200).json(watchlists)
    } catch (err) {
        return res.status(500).send(err)
    }
})

// create watchlist
router.post('/create', auth, async (req, res) => {
    // for now, cap num of watchlists at 1
    let query = await Watchlist.find({userId:req.user._id}).lean().exec()
    if (query.length >= 1) {
        return res.status(400).send('Only one watchlist allowed at this time.')
    }

    let watchlist = new Watchlist({
        userId: req.user._id,
        name: req.body.name
    });
    watchlist.save((err, doc) => {
        if (err) {
            console.log('/create',err)
            return res.status(500).json({success: false, info: err})
        }
        return res.status(200).json({
            success: true,
            info: watchlist
        })
    })

})

// add coin to watchlist body:{watchlistId, coinId}
router.post('/add-crypto', auth, async(req, res) => {
    try {
        const wid = mongoose.Types.ObjectId(req.body.watchlistId)
        let watchlist = await Watchlist.findById(wid).lean().exec()
        if (watchlist == null) {
            return res.status(400).send('No such watchlist')
        }
        if (! watchlist.coins.includes(req.body.coinId)) {
            watchlist.coins.push(String(req.body.coinId))
        }
        let newWatchlist = await Watchlist.findByIdAndUpdate(wid, {coins: watchlist.coins}, {new:true})
        return res.status(200).json(newWatchlist)
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }


})

// remove coin from watchlist
router.post('/remove-crypto', auth, async (req, res) => {
    try {
        let wid = mongoose.Types.ObjectId(req.body.watchlistId)
        let cid = req.body.coinId;
        let watchlist = await Watchlist.findById(wid).lean().exec()
        if (watchlist == null) {
            return res.status(400).send('No such watchlist')
        }
        if (watchlist.coins.includes(cid)) {
            const removeIdx = watchlist.coins.indexOf(cid)
            if (removeIdx < 0) {
                res.status(400).send('Coin not in watchlist')
            }
            watchlist.coins.splice(removeIdx,1)
        }
        let newWatchlist = await Watchlist.findByIdAndUpdate(wid, {coins: watchlist.coins}, {new:true})
        return res.status(200).json(newWatchlist)
    } catch(err) {
        return res.status(500).json(err)
    }
})

// add stock to watchlist
router.post('/add-stock', auth, async (req, res) => {
    
})

// remove stock from watchlist
router.post('/remove-stock', auth, async (req, res) => {
    
})


module.exports = router;
