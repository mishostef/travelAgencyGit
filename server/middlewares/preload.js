const { getById } = require('../services/excursion');
 
module.exports = (paramName = 'id') => async (req, res, next) => {
    const id = req.params[paramName];

    try {
        const data = await getById(id);
        req.data = data;
        next();
    } catch (err) {
        res.status(404).json({ message: 'no such record' });
    }
};