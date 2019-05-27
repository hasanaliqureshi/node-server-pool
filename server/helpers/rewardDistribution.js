const hashSchema = require('../models/hash');
const config = require("../config/config");

var request = require("request");
const hashCalc = hash => {
    var point;
    if(hash < 1){
        point = 0;
    }else if (hash >= 1 && hash <= 100){
        point = 2;
    }else if (hash >=100 && hash <= 500){
        point = 4;
    }else if ( hash >=500 && hash <= 1000 ){
        point = 6;
    }else if ( hash >= 1000 && hash <= 5000 ){
        point = 8;
    }else if ( hash >= 5000 && hash <= 10000){
        point = 10;
    }else if ( hash > 10000 ){
        point = 10;
    }
    return point;
}

const giveReward = () => {
	hashSchema.find({is_rewarded : false}).then(docs => {
		docs.map(doc => {
			if(doc.last_updated){
				console.log(doc.last_updated);
				let md = new Date(doc.last_updated);
				let cd = new Date(Date.now());
				md.setSeconds(md.getSeconds() + 60);
				console.log('----------------------------------');
				console.log(`${md} < ${cd} is validated ${md < cd}`);
				if(md < cd) {
					// if(doc.last_updated){
						doc.hash.map(hash => {
							var hashDetails = hash.toObject();
							let totalHash = hashDetails.totalHash;
							let totalHashRate = hashDetails.hashRate;
							let difficulty;
							if (doc.difficulty < 50) {
								difficulty = 100 - doc.difficulty;
							}else {
								difficulty = doc.difficulty;	
							}
							let reward;
							if (totalHash == 0 || totalHashRate == 0 || difficulty == 0){
								reward = 0;
							}else{
								reward = (((hashCalc(totalHash) / (hashCalc(totalHash) + totalHashRate)) / difficulty)/ 10).toFixed(config.coinDecimal);
							}
							console.log(`(${totalHash} / ${totalHashRate}) / ${difficulty} == ${reward}`);
							console.log('----------------------------------');
							hashSchema.findOneAndUpdate({_id : doc._id}, {'is_rewarded' : true, 'total_reward' : reward}, {new: true}).then(doc=> {
								request.post({
								  headers: {'content-type' : 'application/x-www-form-urlencoded'},
								  url:     'https://streemie.com/appv2/api',
								  body:    "update_hash=true&hash_id="+doc._id+"&hash="+(doc.hash).totalHash+"&reward="+doc.total_reward+"&userid="+doc.userid+"&creator="+doc.source.creator
								}, function(error, response, body){
									if(error){
										console.log(error);
									}
								  console.log(body);
								});
							}).catch(err => {
								console.log(err);
							});
						});		
				};
			}
		});
	}).catch(err => {
		console.log(err);
	});	
};

module.exports = giveReward;
