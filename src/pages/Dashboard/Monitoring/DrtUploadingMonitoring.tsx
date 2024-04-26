import axios from '../../../http/axios';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import chartOneOptions from '../../../components/componentsOptions/ChartOneOptions';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { updateSeries } from '../../../app/features/charts/ChartSeriesSlice';

const ChartOne = () => {
  const [selectBankAccount, setSelectedBankAccount] = useState('bankAccounts'); //Options
  const [bankAccount, setBankAccount] = useState<any[]>([]); //List of Bank Accounts in options
  const [chartOptions, setChartOptions] = useState(chartOneOptions()); //Chart Options
  const [record, setRecord] = useState<{ [key: string]: any }>({});
  const [currentPage, setCurrentPage] = useState(1);

  //Select OPtions
  const [loading, setLoading] = useState(false);

  //Redux
  const dispatch = useAppDispatch();
  const stateSeries = useAppSelector((state) => state.chartSeries.series);

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
          // color: '#10B981',
        }),
      );
    };
    fetchBankWithBankAcount();
  }, []);

  useEffect(() => {

    const getBankAccounts = async () => {
      try {
        const res = await axios.get(`bank_accounts?page=${currentPage}`);
        console.log(res);
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

  const onChange = async (value: string) => {
    // console.log(`selected ${value}`);
    setSelectedBankAccount(value);

    const res = await axios.get(`bank-account-activity/${value}`);

    setRecord(res.data);
    
    //Data
    dispatch(
      updateSeries({
        index: 0,
        name: 'Transactions',
        data: res.data.currentYear.map((item: any) => item.transactions),
      }),
    );
    dispatch(
      updateSeries({
        index: 1,
        name: 'Transactions Last Year',
        data: res.data.lastYear.map((item: any) => item.transactions),
      }),
    );

    //Options Categories date
    setChartOptions({
      ...chartOptions,
      xaxis: {
        ...chartOptions.xaxis,
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    });
  };

  // Filter Search of Select Options
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  //load more data when scroll at bottom
  const handlePopupScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          {/* <div className="mt-2">
            <select
              id="bank"
              name="bank"
              value={selectBankAccount}
              onChange={onUserChange}
              className="bg-white pl-3 block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="bankAccounts">Select Bank Account</option>
              {bankAccount?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.account_no}
                </option>
              ))}
              <option value="loadMore">...load more</option>
            </select>
          </div> */}
          <Select
            dropdownStyle={{ width: '400px' }}
            showSearch
            placeholder="Select Bank Account"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            onPopupScroll={handlePopupScroll}
            loading={loading}
            options={bankAccount.map((item) => ({
              value: item.id,
              label: item.name + '-' + item.account_no,
            }))}
          />
          {record.currentYear && record.currentYear.length > 0 && (
            <div className="flex min-w-47.5">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span>

              <div className="w-full">
                <p className="font-semibold text-primary">Current Year</p>
                <p className="text-sm font-medium">
                  {record.currentYear[0].date +
                    ' - ' +
                    record.currentYear[record.currentYear.length - 1].date}
                </p>
              </div>
            </div>
          )}

          {record.lastYear && record.lastYear.length > 0 && (
            <div className="flex min-w-47.5">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-secondary">Last Year</p>
                <p className="text-sm font-medium">
                  {record.lastYear[0].date +
                    ' - ' +
                    record?.lastYear[record?.lastYear.length - 1].date}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={stateSeries}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
