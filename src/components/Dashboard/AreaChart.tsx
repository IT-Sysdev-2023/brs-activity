import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
interface DataPoint {
  x: string;
  y: number;
}

interface TypeProps {
  name: string;
  data?: DataPoint[];
}
const AreaChart: React.FC<TypeProps> = ({ data, name }) => {

  
  const opt: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data?.map((item) => item.x),
    },
  };

  return (
    <div className="col-span-6 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {name + ' Analytics'}
        </h3>
      </div>

      <div className="mb-2">
        <div className="-ml-5">
          <ReactApexChart
            options={opt}
            series={[
              {
                data: data ? data?.map((item) => item.y) : [],
              },
            ]}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
