const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    variant: {
      type: String,
      required: true,
    },

    price: {
      exShowroom: {
        type: Number,
        required: true,
      },

      onRoad: {
        type: Number,
      },
    },

    carType: {
      type: String,
      enum: ["Hatchback", "Sedan", "SUV", "XUV", "MUV"],
      required: true,
    },

    seatingCapacity: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "EV"],
      required: true,
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "AMT", "CVT"],
      required: true,
    },

    mileage: {
      type: Number,
    },

    batteryRange: {
      type: Number,
    },

    travelType: [
      {
        type: String,
        enum: ["Local", "Highway", "Both"],
      },
    ],

    engineCapacity: {
      type: Number,
    },

    safetyRating: {
      type: Number,
      min: 0,
      max: 5,
    },

    bootSpace: {
      type: Number,
    },

    features: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);