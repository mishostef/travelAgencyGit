const { Schema, model } = require('mongoose');

const schema = new Schema({
    destination: { type: String },
    type: {
        type: String, enum: ['bus', 'plane'], default: 'bus'
    },
    startAt: { type: Date },// '2002-12-09'
    endAt: { type: Date },
    description: { type: String },
    price: { type: Number },
    img: { type: String },
    seats: { type: Number },
    taken: { type: Number, default: 0 },
    participants: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }
})

module.exports = model('Excursion', schema);