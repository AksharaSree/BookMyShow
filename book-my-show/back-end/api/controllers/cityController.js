const citySchema = require('../models/city');


// exports.cityController = (req,res)=>{
//     res.json({
//         cityList:["Chennai", "Bangalore", "Pondicherry"]
//     });
// }

// Display list of all City. -- get
exports.get_city_list = async(req, res) => {
   // res.send('NOT IMPLEMENTED: City list');
   const cityList = await citySchema.find({IsActive:true});    

   res.json({
        cityList
    });
};

// Display detail page for a specific City. -- get
exports.get_city_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: City detail: ' + req.params.id);
    // const city = await citySchema.findOne({"City": req.params.id})    
    // if(city)
    //     return res.send({ status:"WARNING", statusId: 2,  msg:"City already exists"});

    // await new citySchema(req.body).save();
    // res.send({ status:"SUCCESS", statusId: 1, msg:"City has been added Successfully"});

};



//post
exports.create_city = async(req, res) => {

    const city = await citySchema.findOne({"City": req.body.City, "IsActive": true})    
    if(city)
        return res.send({ status:"WARNING", statusId: 2,  msg:"City already exists"});

    await new citySchema(req.body).save();
    res.send({ status:"SUCCESS", statusId: 1, msg:"City has been added Successfully"});

};

//post
exports.update_city = async(req, res) => {
  
   const city = await citySchema.findOne({"_id": req.params.id});
   if(city)    {
    await citySchema.updateOne({"_id": req.params.id}, {"City": req.body.City, "State": req.body.State, "Country":req.body.Country});   
    res.send({ status:"SUCCESS", statusId: 1, msg:"City has been updated Successfully"});

   }
//    else
//     res.send({ status:"ERROR", statusId: 999, msg:"Error "});
};

//deactivate city
exports.deactivate_city = async(req, res) => {
  
    const city = await citySchema.findOne({"_id": req.params.id});
    if(city)    {
     await citySchema.updateOne({"_id": req.params.id}, {"IsActive": false });   
     res.send({ status:"SUCCESS", statusId: 1, msg:"City has been deactivated Successfully"});
 
    }

 };


//delete
exports.delete_city = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};