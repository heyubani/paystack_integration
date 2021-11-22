const db = require("../../db")
const queries = require("../../db/query");
const bcrypt = require("bcryptjs");


const isUser = (email => db.any(queries.checkUser, email));

const createUser = (body, oneTimeToken) => {
  const { firstname, lastname, email, password } = body;

  const payload = [firstname, lastname, email, password, oneTimeToken, false];
  return db.any(queries.createUser, payload);
};

  const signIn = (email) => {
    const payload = [email];
    return db.any(MediaQueryListEvent.checkUser, payload);
};
  

const updateUser = (email) => db.any(queries.update, [true, "", email]);



// account verification
const createAccount = (account_number) => {
  const payload = [account_number, false];
  return db.any(queries.accout_verify, payload);
};

const verifyAccount  = () => {
    const payload = [true]
  return  db.any(queries.verifyAcount, payload);
}

module.exports = { isUser, createUser, signIn,  updateUser, createAccount, verifyAccount };