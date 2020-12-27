const mongoose = require('mongoose');
const Role = require('../api/authentication/role.model').Role;

module.exports = function (app) {
  mongoose
    .connect('mongodb://localhost:27017/walletium', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(connection => {
      init();
      console.log('Application is connected to db');
    })
    .catch(err => console.log(err));

  mongoose.Promise = global.Promise;
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);

  if (app) {
    app.set('mongoose', mongoose);
  }
};

function init() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'moderator'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

function cleanup() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
}
