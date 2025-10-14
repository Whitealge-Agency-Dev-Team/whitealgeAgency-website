const rateLimit = require('express-rate-limit');

const authlimiter = rateLimit({
    windowMs: 5 * 60 / 1000,
    max: 10,
    message: 'Usted ha superado el limite de peticiones, intente más tarde',
    standarHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 / 1000,
    max: 100,
    message: 'Usted ha superado el limite de peticiones, intente más tarde'
});

module.exports = { authlimiter, apiLimiter };