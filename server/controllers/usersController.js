const router = require('express').Router();
const auth = require('../middlewares/auth');
const { register, login } = require('../services/users')
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


router.post('/login', async (req, res) => {
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
    res.status(204).end();//204 -no content
})


module.exports = router;