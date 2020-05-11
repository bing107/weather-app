import React from 'react';

import { action } from '@storybook/addon-actions';
import HourlyWeatherItem from '../src/components/HourlyWeatherItem';

export default {
  title: 'Test',
  component: HourlyWeatherItem,
};

export const Test1 = () => <HourlyWeatherItem />;
