const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authenticationRoutes = require('./authentication/authentication.route');
const accountRoutes = require('./accounts/account.route');
const categoryRoutes = require('./categories/category.route');

const app = express();

app.use(cors()); // configure cors
app.use(bodyParser.urlencoded({ extended: true })); //configure body parser
app.use(bodyParser.json());

app.use('/images/', express.static(path.join('images')));

app.use(morgan('dev')); // configire morgan

require('./config/database.config')(app);

const PORT = process.env.PORT || 4000;

app.use('/api/authentication', authenticationRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
