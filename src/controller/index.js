const {
  createUser,
  isUser,
  updateUser,
  createAccount,
  signIn
  // verifyAccount
} = require("../services");
const sendVerificationEmail = require("../utils/mailer");
const generate = require("../utils/token");
const request = require("request");

const user = async (req, res) => {
  try {

    const userExisted = await isUser(req.body.email);    
         if (userExisted.length === 1) {
           return res.json({
             status: "failed",
             message: "User already exist",
           });
      }
      const oneTimeToken = generate();

    sendVerificationEmail(req.body.email, oneTimeToken);
      const newUser = await createUser(req.body, oneTimeToken);
      return res
        .json({
          status: "success",
          message: "successfully created",
          data: newUser,
        })
        .status(201);
    
  } catch (error) {
    console.log(error)
  }
};

const update = async (req, res) => {
  try {
     const { email } = req.body;
     const { verification } = req.query;
     const user = await isUser(email);
     if (user[0].onetime_token === verification) {
       const Verified = await updateUser(email);
       return res.json({
         status: "success",
         message: "updated Verified user",
         data: Verified,
       });
     }

     res.json({
       status: "failed",
       message: "not updated Verified user",
     });
  } catch (error) {
    console.log(error.message)
  }
 
}

const createdAccount = async (req, res) => {
  const accountVerification = await createAccount(req.body.account_number);
  res.json({
    status: "success",
    message: "account verified",
    data: accountVerification,
  })
}


const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await signIn(email);

  if (user.length === 1) {
    // const passswordValid = bcrypt.compareSync(password, user[0].password); // true
      res.json({
        message: "successfully logged-in user",
        data: user,
        status: "success",
      });
  
  } else {
    res.status(404).json({
      message: "user not found",
      status: "error",
    });
  }
};


const accountVerified = (req, res) => {
  const { accountNumber, code } = req.body
  const PAYSTACK_KEY = process.env.PAYSTACK_KEY;
  // const isverified = await verifyAccount()
const options = {
  url: `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${code}`,
  headers: {
    'Authorization': `Bearer ${PAYSTACK_KEY}`}
};

  request(options,  async (error, response, body) => {

    if (body.status) {
      const isverified = verifyAccount()
      if (isverified) {
        res.json({
          status: "success",
          message: "user account is verified",
          data: body.data,
        });
      }
      }
  });

  

  res.json({
    status: "success",
    message: "user account is verified",
  
  })

}

module.exports = {
  signInUser,
  user,
  update,
  createdAccount,
  accountVerified
};