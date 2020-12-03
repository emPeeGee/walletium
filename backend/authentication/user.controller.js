const User = require('./user.model');

exports.registerNewUser = async (req, res) => {
  try {
    let user = new User({
      username: req.body.name,
      phone_number: req.body.phone_number,
      email: req.body.email
    });
    user.password = await user.hashPassword(req.body.password);

    let createdUser = await user.save();

    res.status(200).json({
      msg: 'New user created',
      data: createdUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

exports.loginUser = async (req, res) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    let user = await User.findOne({
      email: login.email
    });

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
