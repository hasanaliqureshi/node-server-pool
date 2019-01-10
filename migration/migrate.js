const balances = require("../server/controllers/balance");
require("../server/dbConnection");
const default_miner = {
    "username" : "miner",
    "balances" : "0"
};

balances.createBalances(default_miner);