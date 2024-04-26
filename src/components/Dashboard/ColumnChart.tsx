import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ColumnChartsTypes } from '../../types';

const ColumnChart: React.FC<ColumnChartsTypes> = ({ name, data, yearData }) => {
  const series = [
    {
      name: 'Transactions',
      data:
        Object.keys(data).length > 0
          ? [...data[yearData.firstYear], ...(data[yearData.secondYear] ?? [])]
          : [],
    },
  ];

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 380,
    },
    xaxis: {
      type: 'category',
      group: {
        style: {
          fontSize: '10px',
          fontWeight: 700,
        },
        groups: [
          {
            title: Object.keys(data).length > 0 ? yearData.firstYear : '',
            cols:
              Object.keys(data).length > 0
                ? data[yearData.firstYear]?.length
                : 0,
          },
          {
            title: yearData?.secondYear ?? '',
            cols: data[yearData?.secondYear]?.length ?? 0,
          },
        ],
      },
    },
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

export default ColumnChart;
