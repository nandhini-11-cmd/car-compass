const CarCard = ({ car }) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-lg
      border
      border-gray-100
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      group
    "
    >
      <img
        src={
          car.image ||
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
        }
        alt={`${car.brand} ${car.model}`}
        className="
          w-full
          h-56
          object-cover
          group-hover:scale-105
          transition-transform
          duration-500
        "
      />

      <div className="p-5">

        {/* Car Name */}
        <h2 className="text-2xl font-bold text-gray-900">
          {car.brand} {car.model}
        </h2>

        <p className="text-gray-500 mt-1">
          {car.variant}
        </p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-sm text-gray-500">
            Ex Showroom Price
          </span>

          <h3 className="text-2xl font-bold text-blue-600">
            ₹ {car.price?.exShowroom?.toLocaleString()}
          </h3>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
            ⛽ {car.fuelType}
          </span>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            🚗 {car.mileage || "N/A"} kmpl
          </span>

          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
            ⭐ {car.safetyRating || "N/A"}
          </span>

        </div>

        {/* Recommendation Section */}
        {car.matchPercentage && (
          <div className="mt-5">

            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">
                Match Score
              </span>

              <span className="font-bold text-green-600">
                {car.matchPercentage}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${car.matchPercentage}%`,
                }}
              />
            </div>

            <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-3">

              <h3 className="font-semibold text-green-700 mb-2">
                Why Recommended?
              </h3>

              <ul className="space-y-2">
                {car.reasons?.map(
                  (reason, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      <span className="text-green-600">
                        ✓
                      </span>

                      {reason}
                    </li>
                  )
                )}
              </ul>

            </div>

          </div>
          
        )}
        <div className="mt-5">
  <button
    className="
      w-full
      bg-blue-500
      text-white
      py-2
      rounded-xl
      hover:bg-blue-600
      transition
      font-medium
    "
  >
    Know More
  </button>
</div>

      </div>
    </div>
  );
};

export default CarCard;