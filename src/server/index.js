const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { routes } = require('./routes');

const app = express();
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});


app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
