import { useState } from "react";

const CarPreferenceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    budget: "",
    seatingCapacity: "",
    fuelType: "",
    usagePattern: "",
    preferredBrand: "",
    importantFactor: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;
  console.log(formData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
              alt="car"
              className="w-12 h-12"
            />

            <div>
              <h2 className="text-2xl font-bold">
                Need help choosing the right car?
              </h2>

              <p className="text-gray-500 text-sm">
                Answer a few questions and we'll recommend the best cars for your needs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          {/* Budget */}
          <div>
            <label className="block font-medium mb-2">
              Budget
            </label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Budget</option>
              <option value="1000000">Under 10 Lakhs</option>
              <option value="1500000">10-15 Lakhs</option>
              <option value="2000000">15-20 Lakhs</option>
              <option value="3000000">20+ Lakhs</option>
            </select>
          </div>

          {/* Seater */}
          <div>
            <label className="block font-medium mb-2">
              Seating Capacity
            </label>

            <select
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select</option>
              <option value="5">5 Seater</option>
              <option value="7">7 Seater</option>
            </select>
          </div>

          {/* Fuel */}
          <div>
            <label className="block font-medium mb-2">
              Fuel Type
            </label>

            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="EV">EV</option>
            </select>
          </div>

          {/* Usage Pattern */}
          <div>
            <label className="block font-medium mb-2">
              Usage Pattern
            </label>

            <select
              name="usagePattern"
              value={formData.usagePattern}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Usage</option>
              <option value="Local">City</option>
              <option value="Highway">Highway</option>
              <option value="Both">Mixed</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block font-medium mb-2">
              Preferred Brand (Optional)
            </label>

            <input
              type="text"
              name="preferredBrand"
              value={formData.preferredBrand}
              onChange={handleChange}
              placeholder="Hyundai, Tata, Mahindra..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Important Factor */}
          <div>
            <label className="block font-medium mb-2">
              Most Important Factor
            </label>

            <select
              name="importantFactor"
              value={formData.importantFactor}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select</option>
              <option value="Safety">Safety</option>
              <option value="Mileage">Mileage</option>
              <option value="Comfort">Comfort</option>
              <option value="Performance">Performance</option>
              <option value="Features">Features</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Find My Perfect Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarPreferenceModal;