import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import { addOnlineUser, removeOnlineUser, setOnlineUser } from '../../app/features/OnlineUsers.ts';
import ws from '../../ws.tsx';
import AreaChartDot from '../../components/Dashboard/AreaChartDot.tsx';
import axios from '../../http/axios.tsx';
import { fetchedDataType } from '../../types/index.ts';
import chartOneOptions from '../../components/componentsOptions/ChartOneOptions.tsx';
import { updateSeries } from '../../app/features/charts/ChartSeriesSlice.ts';

const ECommerce:React.FC = () => {

  const dispatch = useAppDispatch();
  const defaultValue = useAppSelector((state) => state.onlineUsers.onlineUsers);
  const stateSeries = useAppSelector((state) => state.chartSeries.series);

  const [month, setMonth] = useState('');


  const [chartOptions, setChartOptions] = useState(chartOneOptions());


  useEffect(() => {
    const fetchData = async () => {
      try {
        ws.join('online.users')
          .here((user: any) => dispatch(setOnlineUser(user)))
          .joining(async (user: any) =>
            dispatch(addOnlineUser(user)),
          )
          .leaving(async (user: any) =>
            dispatch(removeOnlineUser(user)),
          ); 
      } catch (error) {
           console.error('Error fetching data:', error);
     }
    };

    fetchData();

  }, []);

  useEffect(() => {
    const usersStat = async () => {
        const res = await axios.get('/visitors-monthly', {
          params: { current: true },
        });
        setMonth(res.data?.month);
        setChartOptions({
          ...chartOptions,
          xaxis: {
            ...chartOptions.xaxis,
            categories: res.data?.date,
          },
        });
  
        dispatch(
          updateSeries({
            index: 0,
            name: 'Total of Users Logged In',
            data: res.data?.users,
          }),
        );
    };
    usersStat();
  }, []);

  return (
    <>
        {/* <LoginForm /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne onlineUsers={defaultValue}/> {/* TOTAL VIEWS */}
        <CardTwo /> {/* TOTAL */}
        <CardThree /> {/* TOTAL BANK ACCOUNT */}
        <CardFour /> {/* TOTAL USERS */}
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        <AreaChartDot
            option={chartOptions}
            series={stateSeries}
            name={`Daily Active Users - ${month}`}
          />
        <ChatCard onlineUsers={defaultValue}/>
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
