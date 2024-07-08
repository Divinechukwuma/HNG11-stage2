const jwt = require('jsonwebtoken');

const generateToken = (user) =>{
    return jwt.sign({userId: user.userId}, process.env.JWT_SECRET, {expiresIn: '48h'});
};

module.exports = {generateToken};