const jwt = require('jsonwebtoken');

const User = require('../api/authentication/user.model');
const Role = require('../api/authentication/role.model').Role;

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
    .populate('role')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Role.findOne(
        {
          _id: user.role._id
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (role.name === 'admin') {
            next();
            return;
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

    Role.findOne(
      {
        _id: user.role._id
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === 'moderator') {
          next();
          return;
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