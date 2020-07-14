const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    portfolioId: {type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio'},
    transactionType: {type: String}, // buy, sell
    action: {type: String},
    from: {
        fromType: {type:String}, // stock, coin, cash
        amt: {type:Number}
    },
    to: {
        toType: {type:String}, // stock, coin, cash
        amt: {type:Number}
    }
})

// get by id
transactionSchema.statics.findById = function(id, callback) {
    this.findById(id).exec(function(err, trans){
        if (err) {
            return;
        }
        callback(trans)
    })
}

// get by user id
transactionSchema.statics.findById = function(id, callback) {

}

// get by portfolio id
transactionSchema.statics.findById = function(id, callback) {

}

// 
transactionSchema.pre('save',function( next ) {
    next()
})


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction }