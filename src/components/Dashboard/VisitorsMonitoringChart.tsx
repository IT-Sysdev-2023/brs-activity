import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

interface ChartFourState {
  series: { data: number[]; name: any }[];
}
interface TypeProps {
  countUser: number[];
  dayOfTheMonth: number[];
}

const VisitorsChart: React.FC<TypeProps> = ({ countUser, dayOfTheMonth }) => {
  const [state, setState] = useState<ChartFourState>({
    series: [
      {
        name: 'today',
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
      series: [{ ...prevState.series[0], data: countUser }],
    }));
  }, [countUser]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Visitors Analytics
        </h3>
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
