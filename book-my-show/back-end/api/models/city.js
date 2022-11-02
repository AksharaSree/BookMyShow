const  mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
   // Id: String, 
    City: String,
    State:String,
    Country:String,
    CreatedDate: { type: Date, default: Date.now()},
    IsActive: {type:Boolean, default:true}
});

module.exports = mongoose.model("City", CitySchema);

