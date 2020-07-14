const express = require('express');
const router = express.Router();
const { Watchlist } = require("../models/Watchlist");
const { check, body, validationResult } = require('express-validator');

const { auth } = require("../middleware/auth");

//=================================
//             Watchlist
//=================================

// get watchlist by user
router.get('/get-watchlist', auth, (req, res) => {
    
})

// create watchlist
router.post('/create', auth, (req, res) => {

})

// add coin to watchlist
router.post('/add-crypto', auth, (req, res) => {
    
})

// remove coin from watchlist
router.post('/remove-crypto', auth, (req, res) => {
    
})

// add stock to watchlist
router.post('/add-stock', auth, (req, res) => {
    
})

// remove stock from watchlist
router.post('/remove-stock', auth, (req, res) => {
    
})


module.exports = router;
