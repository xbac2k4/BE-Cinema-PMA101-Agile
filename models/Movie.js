const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Movie = new Scheme({
    image: { type: String },
    name: { type: String, required: true },
    show_date: { type: String, required: true },
    duration: { type: String, required: true },
    evaluate: { type: Number, required: true, default: 5.0 },
    description: { type: String, required: true },
    directors: { type: String, required: true },
    id_category: { type: Scheme.Types.ObjectId, ref: 'category' },
}, {
    timestamps: true
}
)
module.exports = mongoose.model('movie', Movie)