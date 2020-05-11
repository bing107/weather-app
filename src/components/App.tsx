import React, { useEffect } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import './app.css';

const App = () => {
  useEffect(() => {
    const fetchLocationProperties = async () => {
      try {
        const results = await fetch(
          'https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22'
        );
        // const { items } = await results.json();
        console.log(results);
        // setLocationProperties(items);
        return results;
      } catch (error) {
        throw error;
      }
    };

    fetchLocationProperties().then((results) => {
      // const categoriesList = parseLocationProperties(results);
      // setCategories(categoriesList);
    });
  }, []);
  return (
    <div className="font-robo font-bold text-white bg-weather-bg min-h-screen">
      <svg
        className="fill-current text-weather-sun w-82"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 19.5c-4.135 0-7.5-3.365-7.5-7.5S7.865 4.5 12 4.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5zM12 6c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zM12 3a.75.75 0 01-.75-.75V.75a.75.75 0 011.5 0v1.5A.75.75 0 0112 3zM18.894 5.856a.743.743 0 01-.53-.22.744.744 0 010-1.06l1.061-1.061a.744.744 0 011.06 0 .744.744 0 010 1.06l-1.061 1.061a.743.743 0 01-.53.22zM21.75 12.75a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5h-1.5zM19.955 20.705a.743.743 0 01-.53-.22l-1.061-1.061a.752.752 0 01.53-1.281c.2 0 .389.078.53.22l1.061 1.061a.752.752 0 01-.53 1.281zM12 24a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0112 24zM4.045 20.705a.743.743 0 01-.53-.22.744.744 0 010-1.06l1.061-1.061c.141-.142.33-.22.53-.22s.389.078.53.22a.752.752 0 010 1.061l-1.061 1.061a.744.744 0 01-.53.219zM.75 12.75a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5H.75zM5.106 5.856a.743.743 0 01-.53-.22L3.515 4.575c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53c.141-.142.33-.22.53-.22s.389.078.53.22l1.061 1.061c.142.141.22.33.22.53s-.078.389-.22.53a.743.743 0 01-.53.22z" />
      </svg>
      <span className="text-3xl deg">hello there</span>
      <HourlyWeatherItem />
    </div>
  );
};

export default App;
