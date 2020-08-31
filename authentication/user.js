// to authenticate login details

let express = require("express");
let router = express.Router();
let model = require("../../day 2/db/user");

router.post("/user/auth", async (req,res)=>{
    let user = await model.findOne({"UserLogin.emailId" : req.body.UserLogin.emailId});
    
    if(!user){return res.status(403).send({message : "invalid emailid"})};
    
    let password = await model.findOne({"UserLogin.password" : req.body.UserLogin.password});
    if(!password){return res.status(403).send({message : "Invalid Password"})};
    -

    res.send("Login successfull");

});


module.exports = router;