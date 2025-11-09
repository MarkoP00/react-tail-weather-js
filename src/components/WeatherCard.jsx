import React from "react";
import {
  MapPin,
  Sunrise,
  Sunset,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
} from "lucide-react";
import {
  getWeatherIcon,
  formatTemperature,
  formatTime,
  formatDate,
} from "../../utils/weatherutils";
import * as LucideIcons from "lucide-react";

const WeatherCard = ({ weather, unit }) => {
  const iconName = getWeatherIcon(weather.weather[0]);
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

  const WeatherStats = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-blue-300",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      color: "text-green-300",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity} %`,
      color: "text-cyan-300",
    },
    {
      icon: Gauge,
      label: "Feels Like",
      value: `${formatTemperature(weather.main.feels_like, unit)}°${unit}`,
      color: "text-orange-300",
    },
    {
      icon: Thermometer,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      color: "text-purple-300",
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-shadow-2xl hover:bg-white/15 transition-all duration-500 p-8">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-full">
            <MapPin className="w-5 h-5 text-white/80 " />
          </div>
          <div className="">
            <h2 className="text-white font-semibold text-lg">{weather.name}</h2>
            <p className="text-white/60 text-sm">{weather.sys.country}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/70 text-sm">
            {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-white/70 text-xs">
            {new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
      {/* main weather display */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1">
          <div className="text-7xl font-bold text-white mb-3 tracking-tight">
            {formatTemperature(weather.main.temp, unit)}°
            <span className="text-4xl font-normal text-white/70">{unit}</span>
          </div>

          <div className="text-white/90 text-xl capitalize mb-2 font-medium">
            {weather.weather[0].description}
          </div>
          <div className="flex items-center space-x-4 text-white/60 text-sm">
            <span className="">
              Max: {formatTemperature(weather.main.temp_max, unit)}°
            </span>
            <span className="">
              Low: {formatTemperature(weather.main.temp_min, unit)}°
            </span>
          </div>
        </div>
        <div className="text-white/90 transform hover:scale-110 transition-transform duration-300">
          {/* icons */}
          <IconComponent size={40} className="drop-shadow-2xl"></IconComponent>
        </div>
      </div>
      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* map method logic */}
        {WeatherStats.map((stat, index) => {
          return (
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group"
              key={`${stat.label}-${stat.value}-${stat.index}`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={`p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all`}
                >
                  {/* icons */}
                  <stat.icon className={`w-4 h-4 ${stat.color}`}></stat.icon>
                </div>
                <span className="text-white/70 text-sm font-medium">
                  {stat.label}
                </span>
              </div>
              <div className="text-white font-semibold text-lg pl-11">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
      {/* sum time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-orange-400/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-400/20 rounded-full">
              <Sunrise className="w-4 h-4 text-orange-300" />
            </div>
            <span className="text-white/80 text-sm font-medium">Sunrise</span>
          </div>
          <div className="text-white font-semibold text-lg pl-11">
            {formatTime(weather.sys.sunrise)}
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-400/20 rounded-full">
              <Sunset className="w-4 h-4 text-sm font-medium" />
            </div>
            <span className="text-white/80 text-sm font-medium">Sunset</span>
          </div>
          <div className="text-white font-semibold text-lg pl-11">
            {formatDate(weather.sys.sunset)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
