const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Slot = new Scheme({
    slotName: {type: String, required: true},
    slotType: {type: Number, required: true}
}, {
    timestamps: true
}
)
module.exports = mongoose.model('slot', Slot);