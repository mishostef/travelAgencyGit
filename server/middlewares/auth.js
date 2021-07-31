const secret = 'my special secret'
const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
    console.log(req.headers);
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = jwt.verify(token, secret);
            req.user = userData;
        }

    } catch (err) {
        console.log(err.message);
        res.status(401).json({ message: 'Invalid access token' });
    }
    next();
}