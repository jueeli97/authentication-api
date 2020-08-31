// to check whether user doesnt register more than 1 time.

let express = require("express");
let Joi = require("@hapi/joi");

let model = require("../../day 2/db/user");
let router = express.Router();

//FETCH THE DATA 
router.get("/aluser", async (req, res) => {
    let users = await model.find();
    res.send({ data:users });
});

//find the data by id
router.get("/user1/:id", async (req, res) => {
    let user = await model.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    res.send({ data: user });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//create the user data
router.post("/user/newuser", async (req, res) => {
    let user = await model.find({"UserLogin.emailId" : req.body.UserLogin.emailId}); // to check whether emailid exist or not
    if(user){return res.status(403).send({message : "EmailId already exist"})};
    
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let newData = new model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        Address: req.body.Address,
        UserLogin: req.body.UserLogin
    });
    let data = await newData.save();
    res.send({ message: "thank you", d: data });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update Data
router.put("/user/updateuser/:id", async (req, res) => {
    let user = await model.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id" }) };
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    await user.save();
    res.send({ message: "user data got updated" });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Remove Data
router.delete("/user/removeuser/:id", async (req, res) => {
    let user = await model.findByIdAndRemove(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id" }) };
    res.send({ message: "user data got remove" });
});


//Validation

function ValidationError(error) {
    let Schema = Joi.object({
        firstname: Joi.string().min(4).max(100).required(),
        lastname: Joi.string().min(4).max(200).required(),
        Address:  Joi.string().required(),
        UserLogin: {
            emailId: Joi.string().required().email(),
            password: Joi.string().required()
        }
        
    });
    return Schema.validate(error);
}


module.exports = router;