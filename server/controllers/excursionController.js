const router = require('express').Router();
const { getAll, create, getPromotions, getByDestination,
    reserveSeat, getVacations, getNew, getExcursions, getByUserId, getMostVisited } = require('../services/excursion');
const { isAuth, isOwner } = require('../middlewares/guards');
const { parseError } = require('../util');
const preload = require('../middlewares/preload');


router.get('/promotions', async (req, res) => {
    try {
        const promotions = await getPromotions();
        res.status('200').json(promotions);
    } catch (err) {
        console.error(err);
        res.json({ "message": "promotions error" });
    }

})

router.get('/vacations', async (req, res) => {
    try {
        const promotions = await getVacations();
        res.status('200').json(promotions);
    } catch (err) {
        console.error(err);
        res.json({ "message": "vacations error" });
    }

})

router.get('/new', async (req, res) => {
    try {
        const promotions = await getNew();
        res.status('200').json(promotions);
    } catch (err) {
        console.error(err);
        res.json({ "message": " new trip error" });
    }

})

router.get('/excursions', async (req, res) => {
    try {
        const promotions = await getExcursions();
        res.status('200').json(promotions);
    } catch (err) {
        console.error(err);
        res.json({ "message": "excursions error" });
    }

})


router.get('/', async (req, res) => {
    const destination = req.query.destination;
    const id = req.query.userid;
    const orderby = req.query.orderby;
    console.log(`orderBy=${orderby}`);
    if (id) {
        try {
            const data = await getByUserId(id);
            console.log(data);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({ message: 'error occurred' })
        }
    }
    else if (destination) {
        try {
            const data = await getByDestination(destination);
            console.log(data);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({ message: 'no such record' });
        }
    } else if (orderby) {
        try {
            const data = await getMostVisited();
            console.log(data);
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(404).json({ message: 'cannot get resource' });
        }

    } else {
        const data = await getAll();
        res.json(data);
    }
})

router.post('/', async (req, res) => {
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

router.get('/:id', preload(), async (req, res) => {
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
    res.status('201').json({ "message": "success" });
});


module.exports = router;