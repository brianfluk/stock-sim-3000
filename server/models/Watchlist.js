const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
    ownerId: mongoose.Schema.Types.ObjectId,
    permission: String,
    permissionList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    coins: [{type: String}],
    stocks: [{type: String}],
})

// get watchlist by id
watchlistSchema.statics.findById = function(id, callback) {

}

// get watchlist by userID
watchlistSchema.statics.findByUser = function(userID, callback) {

}

// add coin or stock
watchlistSchema.methods.addToWatchlist = function(itemType, itemId, callback) {

}

// remove coin or stock
watchlistSchema.methods.removeFromWatchlist = function(itemType, itemId, callback) {

}

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = { Watchlist }