const cron = require("node-cron");
const gr = require('./helpers/rewardDistribution.js');

const task = cron.schedule('*/2 * * * * *', () => {
	gr();
},scheduled = false);

module.exports = task;