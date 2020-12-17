const Account = require('./account.model');
const User = require('./../authentication/user.model');

exports.create = async (req, res) => {
  try {
    let userId = req.body.userId;
    let user = await User.findOne({
      _id: userId
    });

    if (!user) {
      res.status(400).json({
        type: 'Not Found',
        message: 'Such user does not exists'
      });
    }

    let account = new Account({
      name: req.body.name,
      color: req.body.color,
      amount: req.body.amount,
      currency: req.body.currency,
      user: userId
    });

    let acc = await Account.findOne({
      name: account.name,
      user: account.user
    });

    if (acc) {
      return res.status(400).json({
        type: 'Such account exists',
        message: 'Such account exists'
      });
    }

    try {
      let createdAccount = await account.save();
      res.status(200).json({
        message: 'New account created',
        data: createdAccount
      });
    } catch (errors) {
      console.log(errors);
      res.status(400).json({
        type: 'Bad Request',
        message: 'Some fields may have errors'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Not Found',
      message: 'Internal server error'
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    let { accountId } = req.params;
    let account = await Account.findOne({
      _id: accountId
    });

    if (!account) {
      res.status(500).json({
        type: 'Not Found',
        message: 'Such account does not exist'
      });
    }

    res.status(200).json({
      message: 'Account is successfully fetched',
      data: account
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.getAllByUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let accounts = await Account.find({
      user: userId
    });

    res.status(200).json({
      message: 'All accounts fetched',
      data: accounts
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.deleteAllByUser = async (req, res) => {
  try {
    let { userId } = req.params;

    let deletedAccounts = await Account.deleteMany({ user: userId });

    res.status(200).json({
      message: 'All accounts of that user was deleted',
      data: deletedAccounts
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    let { accountId } = req.params;
    let account = await Account.findOne({
      _id: accountId
    });

    if (!account) {
      res.status(500).json({
        type: 'Not Found',
        message: 'Such account does not exist'
      });
    }

    let deletedAccount = await Account.deleteOne({
      _id: accountId
    });

    res.status(200).json({
      message: 'Requested account was deleted',
      data: deletedAccount
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId } = req.params;
    const account = {
      name: req.body.name,
      color: req.body.color,
      amount: req.body.amount,
      currency: req.body.currency
    };

    console.log(userId);
    console.log(accountId);
    console.log(account);

    let user = await User.findById(userId);
    if (!user) {
      res.status(500).json({
        type: 'Not found',
        message: 'User not found'
      });
    }

    const updatedAccount = await Account.findOneAndUpdate({ _id: accountId }, account);

    res.status(200).json({
      message: 'Account was updated with success',
      data: updatedAccount
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};
