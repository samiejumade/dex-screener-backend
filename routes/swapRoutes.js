//swapRoutes
const express = require('express');
const router = express.Router();
const { getSwaps, createSwapTransaction } = require('../controllers/swapController');

router.get('/swaps', getSwaps);
// const swapController = require('./swapController');

router.post('/createSwaps', createSwapTransaction);

module.exports = router;
