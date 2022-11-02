const movieSchema = require('../models/movie');

// Display list of all City. -- get
exports.get_movie_list = async(req, res) => {
   // res.send('NOT IMPLEMENTED: City list');
   const movieList = await movieSchema.find({IsActive:true});    

   res.json({
        movieList
    });
};

// Display detail page for a specific City. -- get
exports.get_movie_detail = async(req, res) => {
   // res.send('NOT IMPLEMENTED: City detail: ' + req.params.id);
    const movie = await movieSchema.findOne({"_id": req.params.id});    
    res.json({
        movie
    });

};



//post
exports.create_movie = async(req, res) => {

    const movie = await movieSchema.findOne({"MovieName": req.body.MovieName, "ReleaseDate":req.body.ReleaseDate, "IsActive": true})    
    if(movie)
        return res.send({ status:"WARNING", statusId: 2,  msg:"Movie already exists"});

    req.body.CensorCertification = req.body.CensorCertificatio[0];

    await new movieSchema(req.body).save();
    res.send({ status:"SUCCESS", statusId: 1, msg:"Movie has been added Successfully"});

};

//post
exports.update_movie = async(req, res) => {
  
   const movie = await movieSchema.findOne({"_id": req.params.id});
   if(movie)    {
    await movieSchema.updateOne({"_id": req.params.id}, 
        {
            "MovieName": req.body.MovieName, 
            "MoviePosterUrl": req.body.MoviePosterUrl,
            "ReleaseDate": req.body.ReleaseDate, 
            "RunningTime": req.body.RunningTime,            
            "Languages":req.body.Languages, 
            "Dimensions": req.body.Dimensions,
            "Categories":req.body.Categories,
            "CensorCertification": req.body.CensorCertification[0]

        });   
    res.send({ status:"SUCCESS", statusId: 1, msg:"Movie has been updated Successfully"});

   }

};

//deactivate movie
exports.deactivate_movie = async(req, res) => {
  
    const movie = await movieSchema.findOne({"_id": req.params.id});
    if(movie)    {
     await movieSchema.updateOne({"_id": req.params.id}, {"IsActive": false });   
     res.send({ status:"SUCCESS", statusId: 1, msg:"Movie has been deleted Successfully"});
 
    }

 };


exports.upcoming_movies = async(req, res) => {
    var currrentDate = new Date();
    currrentDate.setDate(currrentDate.getDate() + 5);
   
      const movieList = await movieSchema.find(         
          { 
              ReleaseDate: {  $gte: currrentDate }
          }
      )
      res.json({
           movieList
       });
  }


  exports.recommended_movies = async(req, res) => {
    var currrentDate = new Date();
    currrentDate.setDate(currrentDate.getDate() + 5);
   
      const movieList = await movieSchema.find(         
          { 
              ReleaseDate: {
                  $lte: currrentDate                  
              }
          }
      )
      res.json({
           movieList
       });
  }




exports.search_movies = async(req, res) => {
  
    // let regex = new RegExp(value.searchQuery,'i');
    // const movieList = await movieSchema.find(
    //     { 
    //         $and: [ 
    //             // { $or: [{title: regex },{description: regex}] }, 
    //             //{ category: value.category}, 
    //             //{city:value.city} ,
    //             {"Languages" : { $in : req.body.Languages.Selected}},
    //             {"Categories" : { $in : req.body.Categories.Selected}},
    //             {"Dimensions" : { $in : req.body.Dimensions.Selected}},
    //             {IsActive:true }
    //         ] })
   

let filterArray = [{
    "ReleaseDate": 
        {
            $gte: new Date(new Date(req.body.FromDate).setHours(00, 00, 00)),
            $lte: new Date(new Date(req.body.ToDate).setHours(23, 59, 59))
            
        }
}];


if(req.body.MovieName !=="") //{ "$regex": "Alex", "$options": "i" }
    filterArray.push({"MovieName" : { "$regex" : req.body.MovieName, "$options": "i"}});
    
    console.log(filterArray);
    const movieList = await movieSchema.find(
        filterArray.length > 1 ?
        { 
            $and: filterArray
        }:
        { 
            "ReleaseDate": {
                $gte: new Date(new Date(req.body.FromDate).setHours(00, 00, 00)),
                $lte: new Date(new Date(req.body.ToDate).setHours(23, 59, 59))
                
            }
        }

    )

    


    // movieSchema.find({$or:[{region: "NA"},{sector:"Some Sector"}]}, function(err, user) 
    // {
    //    if (err)
    //    {
    //        res.send(err);
    //    }
    //    console.log(user);
    //    res.json(user);
   
    // });


    res.json({
         movieList
     });
}
