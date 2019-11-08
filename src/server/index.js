const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const auth = require('./auth');

auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
  name: 'session',
  keys: ['123']
})); // TODO -- hide key in ENV variable
app.use(cookieParser());

const { routes } = require('./routes');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
