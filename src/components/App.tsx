import React, { useEffect, useState, FunctionComponent } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import dayjs from 'dayjs';
import { convertFtoC } from '../utils';
import './app.css';
import dataDump from '../dump.json';

type AppProps = {
  widget?: Boolean;
};

const parseForecastItemData = (forecastItem) => {
  const {
    main: { temp, temp_min, temp_max },
    dt,
    weather,
  } = forecastItem;
  return {
    weather: weather[0].description,
    maxTemp: convertFtoC(temp_max),
    minTemp: convertFtoC(temp_min),
    currentTemp: convertFtoC(temp),
    date: dayjs.unix(dt).format('dddd D. MMMM'),
  };
};

const App: FunctionComponent<AppProps> = ({ widget }) => {
  useEffect(() => {
    const fetchLocationProperties = async () => {
      try {
        const results = await fetch(
          'https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast?q=Berlin,DE&appid=b6907d289e10d714a6e88b30761fae22'
        );
        const { list, city } = await results.json();

        // set the first item as the current day
        setCurrentDay(parseForecastItemData(list.shift()));

        setForecastList(list);

        const { name } = city;
        setCityName(name);
      } catch (error) {
        setForecastList(dataDump.list);
        throw error;
      }
    };

    fetchLocationProperties();
  }, []);

  const handleItemClick = (id: number) => {
    const enrichedItemData = parseForecastItemData(
      forecastList.find((item) => item.dt === id)
    );
    setCurrentDay(enrichedItemData);
  };

  const [cityName, setCityName] = useState<any>('Altstadt'); // skipped the loading indicator here + rand name
  const [forecastList, setForecastList] = useState<any>(dataDump.list);
  const [currentDay, setCurrentDay] = useState<any>(
    parseForecastItemData(dataDump.list[21]) // random
  );

  if (widget) {
    return (
      <div className="w-full font-robo text-white bg-weather-bg flex items-center justify-around p-4">
        <svg
          data-testid="main-svg"
          className="fill-current text-weather-yellow w-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 19.5c-4.135 0-7.5-3.365-7.5-7.5S7.865 4.5 12 4.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5zM12 6c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zM12 3a.75.75 0 01-.75-.75V.75a.75.75 0 011.5 0v1.5A.75.75 0 0112 3zM18.894 5.856a.743.743 0 01-.53-.22.744.744 0 010-1.06l1.061-1.061a.744.744 0 011.06 0 .744.744 0 010 1.06l-1.061 1.061a.743.743 0 01-.53.22zM21.75 12.75a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5h-1.5zM19.955 20.705a.743.743 0 01-.53-.22l-1.061-1.061a.752.752 0 01.53-1.281c.2 0 .389.078.53.22l1.061 1.061a.752.752 0 01-.53 1.281zM12 24a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0112 24zM4.045 20.705a.743.743 0 01-.53-.22.744.744 0 010-1.06l1.061-1.061c.141-.142.33-.22.53-.22s.389.078.53.22a.752.752 0 010 1.061l-1.061 1.061a.744.744 0 01-.53.219zM.75 12.75a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5H.75zM5.106 5.856a.743.743 0 01-.53-.22L3.515 4.575c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53c.141-.142.33-.22.53-.22s.389.078.53.22l1.061 1.061c.142.141.22.33.22.53s-.078.389-.22.53a.743.743 0 01-.53.22z" />
        </svg>
        <span className="text-sm deg font-bold leading-tight">
          {currentDay.currentTemp}
        </span>
      </div>
    );
  }

  return (
    <div className="font-robo text-white bg-weather-bg min-h-screen py-28">
      <div className="flex flex-col sm:flex-row justify-between px-20 mb-20">
        <div className="w-32 md:w-48">
          <svg
            data-testid="main-svg"
            className="fill-current text-weather-yellow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 19.5c-4.135 0-7.5-3.365-7.5-7.5S7.865 4.5 12 4.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5zM12 6c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zM12 3a.75.75 0 01-.75-.75V.75a.75.75 0 011.5 0v1.5A.75.75 0 0112 3zM18.894 5.856a.743.743 0 01-.53-.22.744.744 0 010-1.06l1.061-1.061a.744.744 0 011.06 0 .744.744 0 010 1.06l-1.061 1.061a.743.743 0 01-.53.22zM21.75 12.75a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5h-1.5zM19.955 20.705a.743.743 0 01-.53-.22l-1.061-1.061a.752.752 0 01.53-1.281c.2 0 .389.078.53.22l1.061 1.061a.752.752 0 01-.53 1.281zM12 24a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0112 24zM4.045 20.705a.743.743 0 01-.53-.22.744.744 0 010-1.06l1.061-1.061c.141-.142.33-.22.53-.22s.389.078.53.22a.752.752 0 010 1.061l-1.061 1.061a.744.744 0 01-.53.219zM.75 12.75a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5H.75zM5.106 5.856a.743.743 0 01-.53-.22L3.515 4.575c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53c.141-.142.33-.22.53-.22s.389.078.53.22l1.061 1.061c.142.141.22.33.22.53s-.078.389-.22.53a.743.743 0 01-.53.22z" />
          </svg>
        </div>
        <div className="hidden sm:block sm:w-112">
          <div className="flex justify-around text-normal">
            <span className="flex text-weather-grey text-4xl text-left w-50 capitalize">
              {currentDay.weather || 'meatballs'}
            </span>
            <span className="text-weather-grey text-4xl text-right w-50">
              <span className="deg">{currentDay.maxTemp || '42'}</span> /{' '}
              <span className="deg">{currentDay.minTemp || '-42'}</span>
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xl deg font-bold leading-tight">
              {currentDay.currentTemp}
            </span>
          </div>
        </div>
        <div className="sm:w-date">
          <div className="text-center sm:text-left text-weather-grey text-4xl w-50">
            {cityName}
          </div>
          <div className="text-white text-3xl sm:text-lg font-bold pt-8">
            {currentDay.date}
          </div>
        </div>
      </div>
      <div className="flex overflow-x-scroll" data-testid="carousel">
        {forecastList.length > 0 &&
          forecastList.map((item, index) => (
            <HourlyWeatherItem
              key={index}
              id={item.dt}
              time={dayjs.unix(item.dt).format('H:mm')}
              temperature={convertFtoC(item.main.temp)}
              onItemSelect={handleItemClick}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
