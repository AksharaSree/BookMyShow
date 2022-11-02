var express = require('express');
var router = express.Router();

// Perform CRUD for Cinema entity
// router.get('/', function(req, res, next) {
//   res.render('cinemas', { title: 'List of Cinemas' });
// });

var theatreController = require("../controllers/theatreController")

router.get("/", theatreController.get_all_theater_list);
router.get("/:cityId", theatreController.get_theater_list);
//router.get('/:id', theatreController.get_theatre_detail);
router.post('/create', theatreController.create_theatre);
router.post('/update/:id', theatreController.update_theatre);
router.post('/delete/:id', theatreController.deactivate_theatre);

module.exports = router;