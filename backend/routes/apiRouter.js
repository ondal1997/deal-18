const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const townRouter = require('./town');
const productRouter = require('./product');

router.use(userRouter);
router.use(townRouter);
router.use(productRouter);

module.exports = router;
