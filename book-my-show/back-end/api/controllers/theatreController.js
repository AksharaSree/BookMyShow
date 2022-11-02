const theatreSchema = require('../models/theatre');

// Display list of all theatres
exports.get_all_theater_list = async(req, res) => {
   
    const theatreList = await theatreSchema.find({IsActive:true }).populate('CityId')
    // .exec((err, theatre) =>{
    //     if(err){
    //        console.log(err)
    //     }else{
    //        console.log(theatre)
    //     }
    //  });    
 
    res.json(
         theatreList
     );
 };


// Display list of all theatres in a city. -- get
exports.get_theater_list = async(req, res) => {
    console.log(req.params.cityId);
    var ObjectId = require('mongoose').Types.ObjectId; 
   const theatreList = await theatreSchema.find({IsActive:true, City : new ObjectId(req.params.cityId) })
   .populate({
    path: 'City',
    select:
      'City',
  });
//    .exec((err, theatre) =>{
//        if(err){
//           console.log(err)
//          // return handleError(err)
//        }else{
//            if(theatre!==null && theatre!==undefined){
//                 console.log(theatre)
//                 if(theatre.City !== undefined)
//                     console.log(theatre.City);
//            }
//        }
//     });    

   res.json({
        theatreList }
    );
};

// Display detail page for a specific City. -- get
// Have to use with screnn-detail object
// exports.get_screen_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: City detail: ' + req.params.id);
//     const screen = await theatreSchema.find({"_id": req.params.id});

// };



// exports.get_theatre_detail = function(req, res) {
    
//     const theatre = await theatreSchema.find({"_id": req.params.id});

// };

//create theatre
exports.create_theatre = async(req, res) => {

    const theatre = await theatreSchema.findOne({"TheatreName": req.body.TheatreName, "City": req.body.City, "Location": req.body.Location, "IsActive": true})    
    if(theatre)
        return res.send({ status:"WARNING", statusId: 2,  msg:"Theatre already available in the same location"});

    await new theatreSchema(req.body).save();
    res.send({ status:"SUCCESS", statusId: 1, msg:"Theatre has been added Successfully"});

};

//update theatre
exports.update_theatre = async(req, res) => {
    
   const theatre = await theatreSchema.findOne({"_id": req.params.id});
   if(theatre)    {
    await theatreSchema.updateOne({"_id": req.params.id}, {"TheatreName": req.body.TheatreName, "Location": req.body.Location, "Address": req.body.Address});   
    res.send({ status:"SUCCESS", statusId: 1, msg:"Theatre has been updated Successfully"});

   }
   else
    res.send({ status:"ERROR", statusId: 999, msg:"Request Error"});
};

//deactivate theatre
exports.deactivate_theatre = async(req, res) => {
  
    const theatre = await theatreSchema.findOne({"_id": req.params.id});
    if(theatre)    {
     await theatreSchema.updateOne({"_id": req.params.id}, {"IsActive": false });   
     res.send({ status:"SUCCESS", statusId: 1, msg:"Theatre has been deactivated Successfully"});
 
    }

 };


