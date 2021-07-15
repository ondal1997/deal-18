require('dotenv').config();
const configs = require('../configs/config.dev.json');

const express = require('express');
const app = express();
const port = process.env.PORT || configs.server.port;
const apiRouter = require('./routes/apiRouter.js');

app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
