const router = require('express').Router();
const auth = require('../middlewares/auth');
const { isAuth, isGuest } = require('../middlewares/guards');
const { register, login, getUserById } = require('../services/users')
router.post('/register', async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;
    try {
        if (!email) throw new Error(`Email is required`);
        if (password.trim().length < 3) throw new Error(`password should be at least 3 symbols`);
        const userData = await register(email.toLocaleLowerCase(), password);
        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});


router.post('/login', isGuest(), async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;
    try {
        const userData = await login(email, password);
        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});


router.get('/logout', (req, res) => {
    console.log(req);
    res.clearCookie('x-authorization');
    res.removeHeader('x-authorization');
    res.status(204).end();//204 -no content
});

router.get('/user/:id', isAuth(), async (req, res) => {
    const id = req.params.id;
    try {
        const userData = await getUserById(id);
        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});


module.exports = router;