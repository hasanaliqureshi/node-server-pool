const hashSchema = require('../models/hash');
const axios = require('axios');

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
	hashSchema.find({is_rewarded : false, 'userid' : 6}).then(docs => {
		docs.map(doc => {
			if(doc.last_updated){
				console.log(doc.last_updated);
				let md = new Date(doc.last_updated);
				let cd = new Date(Date.now());
				md.setSeconds(md.getSeconds() + 60);
				console.log('----------------------------------');
				console.log(`${md} < ${cd} is validated ${md < cd}`);
				if(md < cd) {
					doc.hash.map(hash => {
						var hashDetails = hash.toObject();
						let totalHash = hashDetails.totalHash;
						let totalHashRate = hashDetails.hashRate;
						let difficulty = doc.difficulty;
						let reward;
						if (totalHash == 0 || totalHashRate == 0 || difficulty == 0){
							reward = 0;
						}else{
							reward = (hashCalc(totalHash) / totalHashRate) / difficulty;
						}
						console.log(`(${totalHash} / ${totalHashRate}) / ${difficulty} == ${reward}`);
						console.log('----------------------------------');
						hashSchema.findOneAndUpdate({_id : doc._id}, {'is_rewarded' : true, 'total_reward' : reward}, {new: true}).then(doc=> {
							var data = new FormData();
							data.append("update_hash", "true");
							data.append("hash_id", doc._id);
							data.append("hash", doc.hash.totalHash);
							data.append("reward", doc.total_reward);
							axios.post('https://streemie.com/appv2/api',
								data).then(response => {
									console.log(response);
								}).catch(error => {
									console.log(error);
								})
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
