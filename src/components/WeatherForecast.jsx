import { Calendar, Droplets } from "lucide-react";
import React from "react";
import * as LucideIcons from "lucide-react";
import {
  formatDate,
  formatTemperature,
  getWeatherIcon,
} from "../../utils/weatherutils";

const WeatherForecast = ({ forecast, unit }) => {
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = item;
    }

    return acc;
  }, {});

  const dailyItems = Object.values(dailyForecast).slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-white/10 rounded-full">
          <Calendar className="w-6 h-6 text-white/80" />
        </div>
        <h2 className="text-2xl font-bold text-white">5 day Forecast</h2>
      </div>
      <div className="space-y-4">
        {/* map method */}
        {dailyItems.map((item, index) => {
          const iconName = getWeatherIcon(item.weather[0]);
          const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

          return (
            <div
              className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10"
              key={Math.floor(Math.random() * 999999)}
            >
              <div className="flex items-center space-x-5 flex-1">
                <div className="text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration">
                  {/* Icon or date would go here */}
                  <IconComponent size={40} />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-lg">
                    {index === 0 ? "Today" : formatDate(item.dt)}
                  </div>
                  <div className="text-white/70 text-sm capitalize font-medium">
                    {item.weather[0].description}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white/60">
                  <Droplets className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium">
                    {Math.round(item.pop * 100)}%
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">
                    {formatTemperature(item.main.temp_max, unit)}°
                  </div>
                  <div className="text-white text-sm font-medium">
                    {formatTemperature(item.main.temp_min, unit)}°
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
