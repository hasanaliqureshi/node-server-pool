const cron = require("node-cron");
const gr = require('./helpers/rewardDistribution.js');

const task = cron.schedule('10 * * * * *', () => {
	gr();
},scheduled = false);

module.exports = task;