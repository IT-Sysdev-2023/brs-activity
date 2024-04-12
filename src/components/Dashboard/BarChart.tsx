import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart: React.FC<{ name?: string; users: any; data: any }> = ({
  name = 'DTR Uploading Monitoring',
  users,
  data,
}) => {
  // console.log(users);
  const series = [
    {
      // parseFloat(data[data.length - 1].progress.toFixed(2))
      data:
        data.length > 0
          ? data
          : [],
      // data: [{
      //   x: 'category A',
      //   y: 50
      // }, {
      //   x: 'category B',
      //   y: 18
      // }, {
      //   x: 'category C',
      //   y: 13
      // }],
    },
  ];

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      max: 100, // Set the maximum value of the Y-axis
    },
    // xaxis: {
    //   categories: data.filter(
    //           (obj, index, self) =>
    //             index === self.findIndex((o) => o.x === obj.x),
    //         ),
    //   // categories: ['sadas', 'sdsad'],
    // },
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {name}
        </h3>
      </div>
      <div>
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
