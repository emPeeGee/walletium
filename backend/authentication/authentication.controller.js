const User = require('./user.model');
const Role = require('./role.model').Role;

exports.signUp = async (req, res) => {
  try {
    let user = new User({
      username: req.body.username,
      phone_number: req.body.phone_number,
      email: req.body.email
    });
    user.password = await user.hashPassword(req.body.password);

    let createdUser = await user.save();

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.status(200).json({
              msg: 'New user created',
              data: createdUser
            });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.status(200).json({
            msg: 'New user created',
            data: createdUser
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

exports.signIn = async (req, res) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    let user = await User.findOne({
      email: login.email
    }).populate('roles');

    //check if user exit
    if (!user) {
      res.status(400).json({
        type: 'Not Found',
        msg: 'Wrong Login Details'
      });
    }

    let match = await user.compareUserPassword(login.password, user.password);
    if (match) {
      let expiresIn = 604800;
      let token = await user.generateJwtToken(
        {
          user
        },
        'secret',
        {
          expiresIn: expiresIn
        }
      );
      if (token) {
        res.status(200).json({
          success: true,
          token: {
            token: token,
            expiresIn: expiresIn
          },
          user: user
        });
      }
    } else {
      res.status(400).json({
        type: 'Not Found',
        msg: 'Wrong Login Details'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Something Went Wrong',
      msg: err
    });
  }
};

exports.defineDummyData = async (req, res) => {
  res.json({
    message: 'Hello World'
  });
};
