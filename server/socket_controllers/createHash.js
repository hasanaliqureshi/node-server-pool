const hashSchema = require("../models/hash");
const diffcalc = require('../controllers/diff.js');

const createHash =(req, res) => {
        let message = req.body;
        let td = diffcalc.calcDiff(message.views, message.comments, message.likes, message.shares, message.subscribers);
        let iu = message.is_user == '1' ? true : false;
        let payload = {
            'ip' : message.ip,
            'source' : message.source,
            'difficulty' : td,
            'is_user' : iu,
            'userid' : message.user,
            'hash' : {
                'totalHash' : 0,
                'hashRate' : 0
            }
        };
        let hash = new hashSchema(payload);
        hash.save().then(doc => {
            res.status(200).json({
                message : {
                    "status" : "success",
                    "doc" : doc._id
                }
            })
        }).catch(err=>{
            console.log("ERROR ", err);
            res.status(400).json({
                "status" : "failed",
                "message": "Error in hash saving"
            })
        })
};

// const createHash = (body) => {
//     let hash = new hashSchema(body);
//     return hash.save().then(doc => {
//         console.log('doc');
//         return JSON.stringify({'status' : 'success', 'message' : doc});
//     }).catch(err=> {
//         console.log(err);
//         return JSON.stringify({'status' : 'false', 'message' : 'error in saving hash'});
//     });
// }

module.exports = createHash;