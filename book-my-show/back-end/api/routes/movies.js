var express = require('express');
var router = express.Router();

// Perform CRUD for movie entity
var movieController = require("../controllers/movieController")

router.get("/", movieController.get_movie_list);
router.get('/:id', movieController.get_movie_detail);
router.post('/create', movieController.create_movie);
router.post('/update/:id', movieController.update_movie);
router.post('/delete/:id', movieController.deactivate_movie);
router.post('/search', movieController.search_movies);
router.post('/recommended_movies', movieController.recommended_movies);
router.post('/upcoming_movies', movieController.upcoming_movies);


module.exports = router;