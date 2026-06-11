const preferenceSchema = new mongoose.Schema({
  
    budget: Number,

    seatingCapacity: Number,

  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "CNG", "EV"],
  },

  transmission: {
      type: String,
      enum: ["Manual", "Automatic", "AMT", "CVT"],
  },

  travelType: {
    type: String,
    enum: ["Local", "Highway", "Both"],
  },
  
  carType: {
    type: String,
    enum: ["Sedan", "SUV", "XUV", "MUV", "Hatchback"],
  },
});