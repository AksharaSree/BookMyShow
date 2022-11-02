const  mongoose = require("mongoose");
require('mongoose-type-url');

const MovieSchema = new mongoose.Schema({
   // Id: String, 
    MovieName: String,
    MoviePosterUrl:{type: mongoose.SchemaTypes.Url},
    ReleaseDate:Date,
    RunningTime : String,
    Categories: Array,
    Languages: Array,
    Dimensions: Array,
    CensorCertification: String,
    CreatedDate: { type: Date, default: Date.now()},
    IsActive: {type:Boolean, default:true},
    Rating:  { type: Number, default: 0}     
});

module.exports = mongoose.model("Movie", MovieSchema);