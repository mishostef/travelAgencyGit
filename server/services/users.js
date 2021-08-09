const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(email, password) {
    const existing = await User.findOne({ email });
    console.log(`existing:${existing}`);
    if (existing) {
        const err = new Error('user with this email already exists');
        err.status = 409;
        throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, hashedPassword });
    await user.save();
    console.log(user)
    return {
        accessToken: await createToken(user),
        _id: user._id,
        email: user.email
    };

}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }
    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }

    return {
        accessToken: await createToken(user),
        _id: user._id,
        email: user.email
    };

}

async function createToken(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'my special secret');
    console.log(`token:${token}`);
    console.log(JSON.stringify(token));
    return token;
}

async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error(`No such user`);
    return user.email;
}

module.exports = {
    register,
    login,
    getUserById
}