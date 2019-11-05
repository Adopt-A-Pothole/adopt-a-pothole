const express = require('express');
const bodyParser = require('body-parser');

const { routes } = require('./routes');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
