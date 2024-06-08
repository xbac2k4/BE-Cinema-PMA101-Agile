const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const DetailTicket = new Scheme({
    
}, {
    timestamps: true
}
)
module.exports = mongoose.model('detailticket', DetailTicket)