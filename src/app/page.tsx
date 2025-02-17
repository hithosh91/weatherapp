"use client";

type WeatherApp = {
  name: string;
  description: string;
  temp_min: number;
  temp_max: number;
  humidity: number;
  main: string;
};

import { useState } from "react";

const Page = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherApp>({
    name: "",
    description: "",
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    main: "",
  });
  const apikey = "f70aec4475c51f4ad1a2017634dd5bbe";
  console.log(data);

  const fetchData = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );
      const weatherData = await response.json();
      const formattedWeather: WeatherApp = {
        name: weatherData.name,
        description: weatherData.weather[0].description,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        main: weatherData.weather[0].main,
      };
      setData(formattedWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-red-500 to-yellow-500 flex flex-col justify-center items-center p-4 animate-fadeIn">
      <h1 className="text-3xl font-bold text-white mb-4">Weather App</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-6 transition-all duration-500 ease-in-out transform hover:scale-105">
        <input
          type="text"
          placeholder="Enter city name"
          className="w-full h-12 rounded-lg border-2 border-gray-300 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={fetchData}
        >
          Search
        </button>
        <div className="w-full bg-sky-300 rounded-lg p-5 flex flex-col justify-center items-center mt-4 shadow-md">
          <h1 className="text-2xl font-mono text-black">{data.name}</h1>
          <h2 className="text-lg text-orange-700">{data.description}</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            <h3 className="text-lg">
              Temp Min:{" "}
              <span className="text-2xl text-gray-500 p-2">
                {data.temp_min}°C
              </span>
            </h3>
            <h3 className="text-lg">
              Temp Max:{" "}
              <span className="text-2xl text-gray-500 p-2">
                {data.temp_max}°C
              </span>
            </h3>
          </div>
          <h3 className="text-2xl text-blue-700 font-semibold mt-2">
            {data.main}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Page;
