const SubCategory = require('./category.model');

exports.create = async (req, res) => {
  //   try {
  //     let subCategory = new SubCategory({
  //       name: req.body.name,
  //       color: req.body.color,
  //       amount: req.body.amount,
  //       currency: req.body.currency,
  //       user: userId
  //     });
  //     let acc = await Account.findOne({
  //       name: account.name,
  //       user: account.user
  //     });
  //     if (acc) {
  //       return res.status(400).json({
  //         type: 'Such account exists',
  //         message: 'Such account exists'
  //       });
  //     }
  //     try {
  //       let createdAccount = await account.save();
  //       res.status(200).json({
  //         message: 'New account created',
  //         data: createdAccount
  //       });
  //     } catch (errors) {
  //       console.log(errors);
  //       res.status(400).json({
  //         type: 'Bad Request',
  //         message: 'Some fields may have errors'
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       type: 'Not Found',
  //       message: 'Internal server error'
  //     });
  //   }
};
