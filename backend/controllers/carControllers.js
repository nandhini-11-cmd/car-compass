const Car = require("../models/car");

// GET /api/cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error("Error fetching cars:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message,
    });
  }
};


const recommendCars = async (req, res) => {
  try {
    const {
      budget,
      seatingCapacity,
      fuelType,
      usagePattern,
      preferredBrand,
      importantFactor,
    } = req.body;

    // ==========================
    // STAGE 1 : HARD FILTERING
    // ==========================

    let filteredCars = await Car.find({
      fuelType,
      seatingCapacity: Number(seatingCapacity),
      "price.exShowroom": {
        $lte: Number(budget),
      },
    });

    let strictMatch = true;

    // ==========================
    // FALLBACK
    // ==========================

    if (filteredCars.length === 0) {
      strictMatch = false;

      filteredCars = await Car.find({
        fuelType,
        "price.exShowroom": {
          $lte: Number(budget),
        },
      });
    }

    if (filteredCars.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        strictMatch: false,
        message:
          "No matching cars found for selected preferences.",
        data: [],
      });
    }

    // ==========================
    // STAGE 2 : SCORING
    // ==========================

    const recommendations = filteredCars.map((car) => {
      let score = 0;
      let maxScore = 0;

      const reasons = [];

      // --------------------------
      // Usage Pattern
      // --------------------------

      maxScore += 20;

      if (
        usagePattern === "Both" &&
        car.travelType.includes("Both")
      ) {
        score += 20;
        reasons.push(
          "Suitable for city and highway driving"
        );
      }

      else if (
        usagePattern === "Local" &&
        car.travelType.includes("Local")
      ) {
        score += 20;
        reasons.push(
          "Excellent for city usage"
        );
      }

      else if (
        usagePattern === "Highway" &&
        car.travelType.includes("Highway")
      ) {
        score += 20;
        reasons.push(
          "Great for highway travel"
        );
      }

      else if (
        car.travelType.includes("Both")
      ) {
        score += 10;
      }

      // --------------------------
      // Brand Preference
      // --------------------------

      maxScore += 15;

      if (
        preferredBrand &&
        car.brand
          .toLowerCase()
          .includes(
            preferredBrand.toLowerCase()
          )
      ) {
        score += 15;

        reasons.push(
          `Matches preferred brand (${car.brand})`
        );
      }

      // --------------------------
      // Important Factor
      // --------------------------

      maxScore += 40;

      switch (importantFactor) {
        case "Safety":

          if (car.safetyRating >= 5) {
            score += 40;

            reasons.push(
              "Excellent safety rating"
            );
          } else if (car.safetyRating >= 4) {
            score += 30;
          } else if (car.safetyRating >= 3) {
            score += 20;
          }

          break;

        case "Mileage":

          if (car.mileage >= 25) {
            score += 40;

            reasons.push(
              "Outstanding mileage"
            );
          } else if (car.mileage >= 20) {
            score += 30;
          } else if (car.mileage >= 15) {
            score += 20;
          }

          break;

        case "Performance":

          if (car.engineCapacity >= 2000) {
            score += 40;

            reasons.push(
              "Strong performance engine"
            );
          } else if (
            car.engineCapacity >= 1500
          ) {
            score += 30;
          } else if (
            car.engineCapacity >= 1200
          ) {
            score += 20;
          }

          break;

        case "Features":

          if (
            car.features &&
            car.features.length >= 5
          ) {
            score += 40;

            reasons.push(
              "Loaded with premium features"
            );
          } else if (
            car.features &&
            car.features.length >= 3
          ) {
            score += 30;
          } else if (
            car.features &&
            car.features.length >= 1
          ) {
            score += 20;
          }

          break;

        default:
          break;
      }

      // --------------------------
      // Mandatory Match Reasons
      // --------------------------

      reasons.push(
        "Matches fuel preference"
      );

      reasons.push(
        "Within selected budget"
      );

      // --------------------------
      // Match Percentage
      // --------------------------

      const matchPercentage =
        Math.round(
          (score / maxScore) * 100
        );

      return {
        ...car.toObject(),
        score,
        matchPercentage,
        reasons,
      };
    });

    // ==========================
    // SORT
    // ==========================

    recommendations.sort(
      (a, b) => b.score - a.score
    );

    // ==========================
    // TOP 5
    // ==========================

    const topCars =
      recommendations.slice(0, 5);

    return res.status(200).json({
      success: true,
      count: topCars.length,
      strictMatch,

      message: strictMatch
        ? "Top matching cars found"
        : "No exact matches found. Showing closest alternatives.",

      data: topCars,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to recommend cars",
      error: error.message,
    });
  }
};



module.exports = {
  getAllCars, recommendCars,
};