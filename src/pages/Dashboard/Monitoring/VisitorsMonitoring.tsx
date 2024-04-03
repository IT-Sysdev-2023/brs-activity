import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb.tsx';
import VisitorsChart from '../../../components/Dashboard/VisitorsMonitoringChart.tsx';
import axios from '../../../http/axios.tsx';

interface fetchedDataType {
  users: number[];
  date: number[];
  month: string;
}
const Visitors = () => {
  const [active, setActive] = useState(true);
  const [data, setData] = useState<fetchedDataType>({
    users: [],
    date: [],
    month: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/visitors-monthly', { params: { current: active} });
        setData(res.data);
        console.log(res.data);
      } catch (er) {
        console.log(er);
      }
    };
    fetchData();
  }, [active]);

  const changeMonth = async (isCurrentMonth: boolean) => {
    setActive(isCurrentMonth);
  };

  return (
    <>
      <Breadcrumb pageName="Visitors Monitoring" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <VisitorsChart
            countUser={data.users}
            dayOfTheMonth={data.date}
            month={data.month}
            toggleMonth={changeMonth}
            isCurrentMonth={active}
          />
        </div>
      </div>
    </>
  );
};

export default Visitors;
