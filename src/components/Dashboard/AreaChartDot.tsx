import ReactApexChart from 'react-apexcharts';

interface TypeProps {
  name?: string;
  series: any;
  option: { [key: string]: any };
}

const AreaChartDot: React.FC<TypeProps> = ({
  option,
  series,
  name = 'data',
}) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {name}
        </h3>
      </div>
      <div>
        <div className="-ml-5">
          <ReactApexChart
            options={option}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaChartDot;
