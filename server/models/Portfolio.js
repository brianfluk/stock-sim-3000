const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'portfolio'
    },
    permission: {
        type: String,
        default: 'private'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    // username: {
    //     type: String,
    //     required: true
    // },
    permissionList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    coins: [
        {
            coinId: {type: String},
            avg: {type: Number},
            numHeld: {type: Number}
        }
    ],
    stocks: [
        {
            stockId: {type: String},
            avg: {type: Number},
            numHeld: {type: Number}
        }
    ],
    cash: {
        type: Number,
        default: 50000,
    },
    createDate: {
        type: Date,
        default: Date.now // `Date.now()` would return Number
    }
})

// get by id
// portfolioSchema.statics.findById = async function(id, callback) {
//     this.findById(id).exec(function(err, portfolio){
//         if (err) {
//             return err;
//         }
//         callback(portfolio)
//     })
// }

// get by user id
portfolioSchema.statics.findByUser = function(userId, callback) {
    this.find({userId: userId}).exec(function (err, portfolio) {
        if (err) {
            return err;
        }
        callback(portfolio);
    })
}

// buy coin or stock
portfolioSchema.methods.buyItem = function(itemType, itemId, numItems, buyAvg, callback) {
    // update cash
}

// sell coin or stock
portfolioSchema.methods.sellItem = function(itemType, itemId, numItems, sellAvg, callback) {
    // update cash
}


const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = { Portfolio }