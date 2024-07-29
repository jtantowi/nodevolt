const hbs = require('hbs');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { sessSecret } = require('../configs');
const { localStrategy } = require('../passport/localStrategy');
const { googleAuthStrategy } = require('../passport/googleStrategy');

const app = express();
app.disable('x-powered-by');

hbs.registerHelper('ifEqualsHelper', (value1, value2, options) =>
  value1 === value2 ? options.fn(this) : options.inverse(this)
);
hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', '/images/', 'favicon.ico')));

app.set('trust proxy', 1);
app.use(
  session({
    secret: sessSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);
passport.use(googleAuthStrategy);
require('../passport/serializeSession');

// Global Variables - messages for the view
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

module.exports = app;
