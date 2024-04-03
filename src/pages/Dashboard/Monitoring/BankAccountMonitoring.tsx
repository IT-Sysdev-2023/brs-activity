import { useState, useEffect } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ChartOne from '../../../components/ChartOne';
import ws from '../../../ws';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import AreaChart from '../../../components/Dashboard/AreaChart';

function BankAccountMonitoring() {
  const [data, setData] = useState([]);
  // const [data, setData] = useState<>({
  //     users: [],
  //     date: [],
  //     month: ''
  //   });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('bank-accounts-balance-transactions');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

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
        <div className="col-span-12 space-y-10">
          <ChartOne />
          <AreaChart name={'Bank Accounts'} />
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
      </div>
    </>
  );
}

export default BankAccountMonitoring;
