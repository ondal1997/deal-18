const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const townRouter = require('./town');
const productRouter = require('./product');
const likeRouter = require('./like');
const chatRouter = require('./chat');

router.use(userRouter);
router.use(townRouter);
router.use(productRouter);
router.use(likeRouter);
router.use(chatRouter);

module.exports = router;
