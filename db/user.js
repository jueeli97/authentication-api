let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstname: { type: String, min: 3, max: 100, required: true },
    lastname: { type: String, min: 3, max: 200, required: true },
    
    Address: {type: String, required: true},
    
    UserLogin: {
        emailId: { type: String, required: true, unique:true },
        password: { type: String, required: true }
    }
});

let userModel = mongoose.model("userDetails", userSchema);


module.exports = userModel;