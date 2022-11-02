var express = require('express');
var router = express.Router();

// Perform CRUD for City entity
var cityController = require("../controllers/cityController")

router.get("/", cityController.get_city_list);
router.get('/:id', cityController.get_city_detail);
router.post('/create', cityController.create_city);
router.post('/update/:id', cityController.update_city);
router.post('/delete/:id', cityController.deactivate_city);
module.exports = router;
