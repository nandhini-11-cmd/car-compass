const express = require("express");

const router = express.Router();

const { getAllCars, recommendCars } = require("../controllers/carControllers");

// GET /api/cars
router.get("/", getAllCars);

//Post /api/recommendCars
router.post("/recommend",recommendCars);


module.exports = router;