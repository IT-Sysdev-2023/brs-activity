import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
// import { getNewSeries } from './utils'; // assuming you have a function getNewSeries defined in utils.js
import { ApexOptions } from 'apexcharts';

const XAXISRANGE = 9000; // Assuming XAXISRANGE is defined

const SampleChart = () => {
  const [series, setSeries] = useState([
    {
      data: [
      ],
    },
  ]);

  const options: ApexOptions = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Dynamic Updating Chart',
      align: 'left',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
    },
    yaxis: {
      max: 100,
    },
    legend: {
      show: false,
    },
  };

  const lastDate = useRef(new Date().getTime());

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate a new series of data
  const getNewSeries = (lastDate, { min, max }) => {
    const newData = [];
    // Generate data for 10 points
    for (let i = 0; i < 10; i++) {
      const timestamp = lastDate + i * 1000; // Assuming data is generated every second
      const value = getRandomNumber(min, max);
      newData.push([timestamp, value]);
    }
    return newData;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = getNewSeries(lastDate.current, { min: 10, max: 90 });
      setSeries([{ data: newData }]);
      lastDate.current += 1000; // Increment lastDate by 1 second
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SampleChart;
