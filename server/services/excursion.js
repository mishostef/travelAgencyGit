const Excursion = require('../models/excursion');
const user = require('../models/user');
const User = require('../models/user');

async function getAll() {
    return Excursion.find({}).lean();
}

async function getByDestination(dest) {
    try {
        const excursions = Excursion.find({ destination: { $regex: new RegExp(dest, "i") } });
        console.log(`${dest}: ${excursions}`);
        return excursions;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getById(id) {
    return Excursion.findById(id);
}

async function reserveSeat(excursionId, userId) {
    const excursion = await Excursion.findById(excursionId);
    console.log(`excursion=${excursion}`);
    excursion.seats--;
    excursion.participants.push(userId);
    excursion.save();
}



async function create(data) {
    const result = await new Excursion(data);
    await result.save();
    return result;
}

async function update(original, updated) {
    Object.assign(original, updated);
    await original.save();
    return original;
}
async function remove(id) {
    return Excursion.findByIdAndDelete(id);

}

async function getPromotions() {
    return Excursion.find({ "isPromoted": true });
}

async function getVacations() {
    return Excursion.find({ "isVacation": true });
}

async function getNew() {
    return Excursion.find({ "isNewOne": true });
}

async function getExcursions() {
    return Excursion.find({ "isVacation": false });
}

async function getByUserId(id) {
    const excursions = await Excursion.find({ "participants": { "$in": [id] } }).sort('startAt');
    const output = [];

    for (const exx of excursions) {
        ex = exx.toObject();
        const participants = ex.participants;
        const excNames = await getNames(participants);
        ex.names = excNames;
        output.push(ex);
    };
    return output;
}


async function getNames(participants) {
    const users = await User.find().where('_id').in(participants);
    console.log((users.map(u => u.email)));
    return ((users.map(u => u.email)));
}

async function getMostVisited() {
    const countries = await Excursion.find({ participants: { $exists: true, $ne: [] } })
        .select('participants destination');

    return countries.map(c => {
        const length = c.participants.length;
        return { length, destination: c.destination };
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByDestination,
    reserveSeat,
    getPromotions,
    getVacations,
    getNew,
    getExcursions,
    getByUserId,
    getMostVisited
}