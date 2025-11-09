const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Entered City was not found");
      } else if (response.status === 401) {
        throw new Error(
          "Invalid Api key. Check your OpenWeatherMap Api configuration"
        );
      } else {
        throw new Error("Weather service unavailable. Try again later");
      }
    }

    const data = await response.json();

    // current timestamp - ensure
    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    localStorage.setItem("lastSearch", city);
    return data;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Network error");
    }
    throw err;
  }
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid Api key. Check your OpenWeatherMap Api configuration"
        );
      } else {
        throw new Error("Weather service unavailable. Try again later");
      }
    }

    const data = await response.json();

    // current timestamp - ensure
    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Network error");
    }
    throw err;
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Entered City was not found");
      } else if (response.status === 401) {
        throw new Error(
          "Invalid Api key. Check your OpenWeatherMap Api configuration"
        );
      } else {
        throw new Error("Weather service unavailable. Try again later");
      }
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Network error");
    }
    throw err;
  }
};

export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid Api key. Check your OpenWeatherMap Api configuration"
        );
      } else {
        throw new Error("Weather service unavailable. Try again later");
      }
    }

    const data = await response.json();
    //format data to match expeted format

    return data.map((city) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Network error");
    }
    throw err;
  }
};
