require('dotenv').config();
const configs = require('../configs/config.dev.json');
const apiRouter = require('./routes/apiRouter.js');

const express = require('express');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'backend/public/img/' });
const app = express();
const port = process.env.PORT || configs.server.port;
const limit = '100mb';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    httpOnly: true,
    secure: true,
    secret: process.env.SESSION_SECRET || configs.server.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }),
);

app.post('/upload', upload.single('upload'), (req, res) => {
  res.json({
    url: '/img/' + req.file.filename,
  });
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
