const queries = {
  createUser: `
        INSERT INTO data (
            firstname,
            lastname,
            email,
            password,
            onetime_token,
            isVerified
        ) VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `,
  
  checkUser: `
        SELECT * FROM data
        WHERE email=$1 
    `,
  update: `
        Update data SET isVerified=$1, onetime_token=$2
        WHERE email=$3 RETURNING *
    `,
  accout_verify: `
      INSERT INTO accountDetails (
            account_number,
            varification_status
        ) VALUES($1, $2)
        RETURNING *
  `,
  verifyAcount: `
    Update accountDetails SET account_number=$1 RETURNING *
  `,
};

module.exports = queries;