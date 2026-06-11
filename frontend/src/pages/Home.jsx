import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import CarPreferenceModal from "../components/CarPreferenceModal";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  
  useEffect(() => {
  const modalShown = sessionStorage.getItem("carPreferenceShown");

  if (!modalShown) {
    const timer = setTimeout(() => {
      setShowModal(true);

      sessionStorage.setItem(
        "carPreferenceShown",
        "true"
      );
    }, 10000);

    return () => clearTimeout(timer);
  }
}, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
    
      const response = await api.get("/cars");
       
      setCars(response.data.data);
    } catch (err) {
      console.error(err);

      setError("Failed to fetch cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceSubmit = async (
  answers
) => {
  try {
    const response = await api.post(
      "/cars/recommend",
      answers
    );
  console.log(response.data.data);
    setCars(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold">
          Loading cars...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <h1 className="text-red-500 text-xl">{error}</h1>
      </div>
    );
  }




 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    
    <CarPreferenceModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handlePreferenceSubmit}
    />

    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent animate-bounce">
          CarCompass
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect car based on your budget,
          family size, fuel preference, and driving needs.
        </p>
      </div>

      {/* Recommendation Banner */}
      {cars.length > 0 && cars[0]?.matchPercentage && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold">
            🎯 Personalized Recommendations are Ready...
          </h2>

          <p className="mt-2">
            Based on your preferences we found{" "}
            <span className="font-bold">
              {cars.length}
            </span>{" "}
            matching cars.
          </p>
        </div>
      )}

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

    </div>
  </div>
);
};

export default Home;