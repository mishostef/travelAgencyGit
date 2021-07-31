const Excursion = require('../models/excursion');

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
module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByDestination,
    reserveSeat
}