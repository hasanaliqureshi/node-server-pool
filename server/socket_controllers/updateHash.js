const hashSchema = require("../models/hash");
const updateHash =(req, res) => {
        hashSchema.findOneAndUpdate(
            {_id : req.body.id}, req.body, {new :true})
        .then(doc => {
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
                "message": "Error in hash updaing"
            })
        })
};

module.exports = updateHash;