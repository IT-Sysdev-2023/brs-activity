import { useState, useEffect } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ChartOne from '../../../components/ChartOne';

//Redux
import chartOneOptions from '../../../components/componentsOptions/ChartOneOptions';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { updateSeries } from '../../../app/features/charts/ChartSeriesSlice';

//Websocket
import ws from '../../../ws';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import AreaChart from '../../../components/Dashboard/AreaChart';
import AreaNullChart from '../../../components/Dashboard/AreaNullChart';
import AreaChartDot from '../../../components/Dashboard/AreaChartDot';

function BankAccountMonitoring() {
  const [data, setData] = useState([]);
  const [chartOptions, setChartOptions] = useState(chartOneOptions());

  const dispatch = useAppDispatch();
  const stateSeries = useAppSelector((state) => state.chartSeries.series);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('bank-accounts-balance-transactions');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBankWithBankAcount = async () => {
      const res = await axios.get('banks-of-bank-accounts');

      setChartOptions({
        ...chartOptions,
        xaxis: {
          ...chartOptions.xaxis,
          categories: res.data.map((item: any) => item.acronym),
        },
      });

      dispatch(
        updateSeries({
          index: 0,
          name: 'No. of Bank Accounts',
          data: res.data.map((item: any) => item.bank_accounts_count),
          // color: '#10B981',
        }),
      );
    };

    fetchBankWithBankAcount();
    fetchData();

    // const uploadingDtrListen = async () => {
    //   try {
    //     ws.private('admin-dtr-uploading').listen(
    //       '.dtr-inserted-event',
    //       (event: any) => {
    //         console.log(event);
    //       },
    //     );
    //   } catch (er) {
    //     console.log(er);
    //   }
    // };
    // uploadingDtrListen();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Bank Account Monitoring" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 justify-center space-y-10 ">
          <AreaNullChart name="Bank Account Transactions" />

          {/* <ReactApexChart
            options={options}
            series={[
              {
                name: 'XYZ MOTORS',
                data: [
                  {
                    x: new Date('2018-02-12').getTime(),
                    y: 76,
                  },
                ],
              },
            ]}
            type="area"
            height={350}
          /> */}
          {/* <VisitorsChart countUser={data.users} dayOfTheMonth={data.date} month={data.month} /> */}
        </div>
        <div className="col-span-6 justify-center space-y-10 ">
          <AreaChart data={data} name={'Bank Accounts Balance'} />
        </div>
        <div className="col-span-6 justify-center space-y-10 ">
          <AreaChartDot
            option={chartOptions}
            series={stateSeries}
            name="Banks Analysis"
          />
        </div>
      </div>
    </>
  );
}

export default BankAccountMonitoring;
