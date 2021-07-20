const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const townRouter = require('./town');
const productRouter = require('./product');
const likeRouter = require('./like');

router.use(userRouter);
router.use(townRouter);
router.use(productRouter);
router.use(likeRouter);

module.exports = router;
