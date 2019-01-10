const hashSchema = require("../models/hash");

// const createHash =(req, res) => {
//         let hash = new hashSchema(req.body);
//         hash.save().then(doc => {
//             res.status(200).json({
//                 message : {
//                     "status" : "success",
//                     "doc" : doc
//                 }
//             })
//         }).catch(err=>{
//             console.log("ERROR ", err);
//             res.status(400).json({
//                 "status" : "failed",
//                 "message": "Error in hash saving"
//             })
//         })
// };

const createHash = (body) => {
    let hash = new hashSchema(body);
    return hash.save().then(doc => {
        console.log('doc');
        return JSON.stringify({'status' : 'success', 'message' : doc});
    }).catch(err=> {
        console.log(err);
        return JSON.stringify({'status' : 'false', 'message' : 'error in saving hash'});
    });
}

module.exports = createHash;