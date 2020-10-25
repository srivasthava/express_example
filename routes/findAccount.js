const express = require('express');
const router = express.Router();

/* GET books listing. */
router.get('/', function (req, res, next) {
    res.send('You requested findaccount....');
});

/* GET a specific book with ID */
router.get('/:accountId', function (req, res, next) {
    res.send(`You request information on account with ID ${req.params.accountId}`);
});

module.exports = route