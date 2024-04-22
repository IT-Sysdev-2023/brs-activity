import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const AreaNullChart: React.FC<{name:string, series: any}> = ({ name = 'Name', series }) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'area',
      height: 350,
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    // dataLabels: {
    //   enabled: false,
    //   formatter: function (val) {
    //     return val.toLocaleString();
    //   }
    // },
  
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 0.8,
      type: 'pattern',
      pattern: {
        style: ['verticalLines', 'horizontalLines'],
        width: 5,
        height: 6,
      },
    },
    markers: {
      size: 5,
      hover: {
        size: 9,
      },
    },
    tooltip: {
      intersect: true,
      shared: false,
    },
    theme: {
      palette: 'palette1',
    },
    xaxis: {
      type: 'datetime',
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
            options={options}
            series={[
              {
                name: 'Network',
                data: series
              },
            ]}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default AreaNullChart;
