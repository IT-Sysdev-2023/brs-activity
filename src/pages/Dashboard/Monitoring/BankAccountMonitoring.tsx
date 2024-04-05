import { useState, useEffect } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';

import { Select } from 'antd';

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
import ColumnChart from '../../../components/Dashboard/ColumnChart';

function BankAccountMonitoring() {
  const [selectBankAccount, setSelectedBankAccount] = useState('');
  const [areaChartRecord, setAreaChartRecord] = useState<{
    [key: string]: any;
  }>([]);

  const [data, setData] = useState([]);
  const [chartOptions, setChartOptions] = useState(chartOneOptions());
  const [areaData, setAreaData] = useState<{
    firstYear?: string;
    secondYear?: any;
  }>();

  const [currentPage, setCurrentPage] = useState(1);
  const [bankAccount, setBankAccount] = useState<any[]>([]); //List of Bank Accounts in options
  //Select OPtions
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const stateSeries = useAppSelector((state) => state.chartSeries.series);

  const onChange = async (value: string) => {
    // console.log(`selected ${value}`);
    setSelectedBankAccount(value);

    const res = await axios.get(`bank-account-activity`, {
      params: { bankAccount: value },
    });
    setData(res.data['chartOne']);
    setAreaChartRecord(res.data['chartTwo']);
    setAreaData({
      firstYear: Object.keys(res.data['chartTwo'])[0],
      secondYear: Object.keys(res.data['chartTwo'])[1],
    });
  };

  // Filter Search of Select Options
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handlePopupScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getBankAccounts = async () => {
      try {
        const res = await axios.get(`bank_accounts?page=${currentPage}`);
        // console.log(res);
        setBankAccount((prevState) =>
          [...prevState, ...res.data.data].filter(
            (item, index, self) =>
              index === self.findIndex((items) => items.id === item.id),
          ),
        );
      } finally {
        setLoading(false);
      }
    };

    getBankAccounts();
  }, [currentPage]);

  useEffect(() => {
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
        }),
      );
    };

    const fetchAreaChartRecord = async () => {
      try {
        const res = await axios.get(`bank-account-activity`);

        setData(res.data['chartOne']);
        setAreaChartRecord(res.data['chartTwo']);

        setAreaData({
          firstYear: Object.keys(res.data['chartTwo'])[0],
          secondYear: Object.keys(res.data['chartTwo'])[1],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAreaChartRecord();
    fetchBankWithBankAcount();
    // fetchData();

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
        <div className="col-span-12">
          <Select
            style={{ width: '100%', height: '45px' }}
            showSearch
            placeholder="Select Bank Account"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            onPopupScroll={handlePopupScroll}
            loading={loading}
            options={bankAccount?.map((item) => ({
              value: item.id,
              label: item.name + '-' + item.account_no,
            }))}
          />
        </div>
        <div className="col-span-12 justify-center space-y-10 ">
          <AreaNullChart name="Bank Account Transactions" series={data} />
        </div>
        <div className="col-span-6 justify-center space-y-10 ">
          <ColumnChart
            name={'No. of Transactions'}
            data={areaChartRecord}
            yearData={areaData}
          />
          {/* <AreaChart data={areaChartRecord} name={'Bank Accounts Balance'} /> */}
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
