const balanceSchema = require("../models/balances");

const balances = {
    createBalances : (balance_req) => {
        console.log(balance_req);
        let balance = new balanceSchema(balance_req);
        balance.save().then(doc => {
            return {"status" : "success" , "message" : "balance created"};
        }).catch(err => {
            console.log("ERR ", err);
        });
    },

    uppdateBalances : (balance_req) => {
        balanceSchema.findOneAndUpdate(
            {username : balance_req.username},
            balance_req,
            {new : true}
        ).then(doc => {
            return {"status" : "success", "message" : "balance update"};
        }).catch(err=> {
            console.log("ERR" , err);
        });
    }
};

module.exports = balances;