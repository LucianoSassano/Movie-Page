const express = require("express");
const movieController = require("../servidor/controladores/movie");
const router = express.Router();

router.get("/peliculas", movieController.getAllMovies);
router.get("/generos",movieController.getAllGenres)


module.exports = router;
