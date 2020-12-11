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
    let role;

    if (req.body.role) {
      role = await Role.findOne({ name: req.body.role });
    } else {
      role = await Role.findOne({ name: 'user' });
    }

    user.role = role._id;

    createdUser = await user.save();

    res.status(200).json({
      message: 'New user created',
      data: createdUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Not Found',
      message: 'Internal server rrror'
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
    }).populate('role');

    if (!user) {
      res.status(400).json({
        type: 'Not Found',
        message: 'Such user does not exists'
      });
    }

    let match = await user.compareUserPassword(login.password, user.password);
    if (match) {
      let expiresIn = 604800;
      let token = await user.generateJwtToken({ user }, 'secret', { expiresIn: expiresIn });

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
        message: 'Incorrect or invalid password'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Something Went Wrong',
      message: 'Internal server error'
    });
  }
};

exports.defineDummyData = async (req, res) => {
  res.json({
    message: 'Hello World'
  });
};
