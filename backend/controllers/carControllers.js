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
       transmission,
       carType,
       usagePattern,
       preferredBrand,
       importantFactor,
    } = req.body;

    // ==========================
    // STAGE 1 : HARD FILTERING
    // ==========================

    const query = {
  fuelType,

  seatingCapacity:
    Number(seatingCapacity),

  "price.exShowroom": {
    $lte: Number(budget),
  },
};

if (transmission) {
  query.transmission =
    transmission;
}

if (carType) {
  query.carType =
    carType;
}

let filteredCars =
  await Car.find(query);

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
      if (transmission) {
  reasons.push(
    `Matches ${transmission} transmission preference`
  );
}

if (carType) {
  reasons.push(
    `Matches preferred ${carType} body style`
  );
}

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

      
maxScore +=
  importantFactor.length * 15;

importantFactor.forEach(
  (factor) => {

    switch (factor) {

      case "Safety":

        if (
          car.safetyRating >= 5
        ) {

          score += 15;

          reasons.push(
            "Excellent safety rating"
          );
        }

        break;

      case "Mileage":

        if (
          car.mileage >= 20
        ) {

          score += 15;

          reasons.push(
            "Excellent mileage"
          );
        }

        break;

      case "Performance":

        if (
          car.engineCapacity >=
          1500
        ) {

          score += 15;

          reasons.push(
            "Strong performance"
          );
        }

        break;

      case "Features":

        if (
          car.features.length >= 4
        ) {

          score += 15;

          reasons.push(
            "Loaded with premium features"
          );
        }

        break;

      case "Comfort":

        if (
          car.features.includes(
            "Ventilated Seats"
          )
        ) {

          score += 15;

          reasons.push(
            "Comfort-focused cabin"
          );
        }

        break;
    }

  }
);

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