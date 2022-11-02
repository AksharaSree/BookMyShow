const    mongoose = require("mongoose");

const TheatreSchema = new mongoose.Schema({
  
    City: {
        type: mongoose.Schema.Types.ObjectId, ref: "City"
    },
    Location:String,
    TheatreName:String,    
   // ShowTimes: Array, 
    Address: String,
    ScreenCount:Number, // As of now, will configure theatre schema with only one screen
    //ScreenDetail: Object, // This will be used in future, when multiple screens available in a theatre
    IsActive: {type:Boolean, default:true},
    CreatedDate: { type: Date, default: Date.now()},  
    Rating:   { type: Number, default: 0}          
    //InsertUserId:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
});


module.exports = mongoose.model("Theatre", TheatreSchema);
