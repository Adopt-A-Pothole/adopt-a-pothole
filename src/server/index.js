const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { routes } = require('./routes');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
