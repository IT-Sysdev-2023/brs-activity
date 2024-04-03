import { useState, useEffect } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ChartOne from '../../../components/ChartOne';
import ws from '../../../ws';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

function UserMonitoring() {
  // const [data, setData] = useState<>({
  //     users: [],
  //     date: [],
  //     month: ''
  //   });

  const opt: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Bank Account ',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: 'Price',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: any) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  };

  useEffect(() => {
    const uploadingDtrListen = async () => {
      try {
        ws.private('admin-dtr-uploading').listen(
          '.dtr-inserted-event',
          (event: any) => {
            console.log(event);
          },
        );
      } catch (er) {
        console.log(er);
      }
    };
    uploadingDtrListen();
  }, []);

  return (
    <>
      <Breadcrumb pageName="DTR Uploading Monitoring" />
      <span>Bank Stat</span>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 space-y-10">
          <ChartOne />
          <ChartOne />
          <ReactApexChart
            options={opt}
            series={[
              {
                name: 'Bank Accounts',
                data: [
                  { x: new Date('2024-03-14').getTime(), y: 4400000 },
                  { x: new Date('2024-03-15').getTime(), y: 4500000 },
                  { x: new Date('2024-03-16').getTime(), y: 4600000 },
                  { x: new Date('2024-03-17').getTime(), y: 4700000 },
                  { x: new Date('2024-03-18').getTime(), y: 4800000 },
                  { x: new Date('2024-03-19').getTime(), y: 4900000 },
                  { x: new Date('2024-03-20').getTime(), y: 5000000 },
                  { x: new Date('2024-03-21').getTime(), y: 400000 },
                  { x: new Date('2024-03-22').getTime(), y: 500000 },
                  { x: new Date('2024-03-23').getTime(), y: 4300000 },
                  { x: new Date('2024-03-24').getTime(), y: 4000000 },
                ],
              },
            ]}
            type="area"
            height={350}
          />
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

export default UserMonitoring;
