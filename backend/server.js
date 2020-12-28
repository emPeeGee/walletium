const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authenticationRoutes = require('./src/api/authentication/authentication.route');
const accountRoutes = require('./src/api/accounts/account.route');
const categoryRoutes = require('./src/api/categories/category.route');

const app = express();

app.use(cors()); // configure cors
app.use(bodyParser.urlencoded({ extended: true })); //configure body parser
app.use(bodyParser.json());

app.use('/images/', express.static(path.join(__dirname, 'public', 'images')));

app.use(morgan('dev')); // configire morgan

require('./src/config/database.config')(app);

const PORT = process.env.PORT || 4000;

app.use('/api/authentication', authenticationRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
