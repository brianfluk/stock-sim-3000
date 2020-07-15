const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        default: 'watchlist'
    },
    permission: {
        type: String,
        default: 'private'
    },
    permissionList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    coins: [String],
    stocks: [String],
})



// // add coin or stock
// watchlistSchema.methods.addToWatchlist = function(itemType, itemId, callback) {

// }

// // remove coin or stock
// watchlistSchema.methods.removeFromWatchlist = function(itemType, itemId, callback) {

// }

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = { Watchlist }