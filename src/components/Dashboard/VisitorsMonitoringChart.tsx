import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { VisitorsMonitoringCharts } from '../../types';

const VisitorsChart: React.FC<VisitorsMonitoringCharts> = ({
  countUser,
  dayOfTheMonth,
  month,
  toggleMonth,
  isCurrentMonth,
}) => {
  const [state, setState] = useState<{
    series: { data: number[]; name: any }[];
  }>({
    series: [
      {
        name: 'label',
        data: dayOfTheMonth,
      },
    ],
  });

  const options: ApexOptions = {
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: dayOfTheMonth,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inter',

      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
    },
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [{ name: month, data: countUser }],
    }));
  }, [countUser, month]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {month + ' Analytics'}
        </h3>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => toggleMonth(true)}
              className={` ${isCurrentMonth ? 'bg-white shadow-card dark:bg-boxdark' : ''} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card  dark:text-white dark:hover:bg-boxdark`}
            >
              Current
            </button>
            <button
              onClick={() => toggleMonth(false)}
              className={`${!isCurrentMonth ? 'bg-white shadow-card dark:bg-boxdark' : ''} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              Last
            </button>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorsChart;
