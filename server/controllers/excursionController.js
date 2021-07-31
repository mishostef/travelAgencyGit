const router = require('express').Router();
const { getAll, create, getById, update, remove, getByDestination, reserveSeat } = require('../services/excursion');
const { isAuth, isOwner } = require('../middlewares/guards');
const { parseError } = require('../util');
const preload = require('../middlewares/preload');


router.get('/', async (req, res) => {
    const destination = req.query.destination;
    console.log(destination);
    if (destination) {
        try {
            const data = await getByDestination(destination);
            console.log(data);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({ message: 'no such record' });
        }
    } else {
        const data = await getAll();
        res.json(data);
    }
})

router.post('/', async (req, res) => {
   // console.log(req.body);

    const data = {
        destination: req.body.destination,
        type: req.body.type,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        description: req.body.description,
        price: +req.body.price,
        img: req.body.img,
        seats: req.body.seats,
        taken: req.body.taken,
    }
    try {
        const result = await create(data);
        res.status(201).json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
    }
});

router.get('/:id',isAuth(), preload(), async (req, res) => {
    const item = req.data.toObject();
    console.log(item);
    res.json(item);
});

router.post('/:id', isAuth(), async (req, res) => {
    const excursionId = req.params.id;
        const user = req.user;
    const userId = user._id;
    try {
        await reserveSeat(excursionId, userId);
    } catch (err) {
        console.dir(err);
    }
    res.status('201').json( {"message":"success"});
})



module.exports = router;