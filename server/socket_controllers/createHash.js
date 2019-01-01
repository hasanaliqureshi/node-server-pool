const hashSchema = require("../models/hash");

const createHash =(req, res) => {
        let hash = new hashSchema(req.body);
        hash.save().then(doc => {
            res.status(200).json({
                message : {
                    "status" : "success",
                    "doc" : doc
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

module.exports = createHash;