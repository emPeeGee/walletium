const jwt = require('jsonwebtoken');

const User = require('../authentication/user.model');
const Role = require('../authentication/role.model').Role;

verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
      return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }

      req.userData = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({
      message: 'Authentification Failed'
    });
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userData.user._id)
    .populate('roles')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(user);
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
              next();
              return;
            }
          }

          res.status(403).send({ message: 'Require Admin Role!' });
          return;
        }
      );
    });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Require Moderator Role!' });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
