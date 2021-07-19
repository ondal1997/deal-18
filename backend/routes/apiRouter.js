const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const townRouter = require('./town');

router.use(userRouter);
router.use(townRouter);

module.exports = router;
