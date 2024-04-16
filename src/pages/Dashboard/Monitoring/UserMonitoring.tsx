import { useEffect, useState } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ws from '../../../ws';
import BarChart from '../../../components/Dashboard/BarChart';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setOnlineUser,
  addOnlineUser,
  removeOnlineUser,
} from '../../../app/features/OnlineUsers';
import TableOne from '../../../components/TableOne';
import ChatCard from '../../../components/ChatCard';
import OnlineUsersCard from '../../../components/Dashboard/OnlineUsersCard';
import UsersActivityTable from '../../../components/Dashboard/UsersActivityTable';
import { duration, useWsOnlineUsers } from '../../Helper';

const UserMonitoring: React.FC = () => {
  const [userProgress, setUserProgress] = useState([]);
  const [log, setLog] = useState([]);
  useWsOnlineUsers(); 

  useEffect(() => {

    const uploadingDtrListen = () => {
      ws.private('admin-dtr-uploading').listen(
        '.dtr-inserted-event',
        (event: any) => {
          const { currentRow, totalRows, userId } = event;

          const percentage = Math.floor((currentRow / totalRows) * 100);

          setUserProgress((prevProgress) => {
            const checkId = prevProgress.some((item) => item.x === userId);

            if (!checkId) {
              return [...prevProgress, { x: userId, y: percentage }];
            } else {
              return [{ x: userId, y: percentage }];
            }
          });
        },
      );
    };

    const usersLog = async () => {
      const res = await axios.get('users-log');
      console.log(res.data);
      setLog(res.data);
    }

    usersLog();
    
    uploadingDtrListen();
  }, []);
  return (
    <>
      <Breadcrumb pageName="Real-Time Monitoring Statistics" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 space-y-10 ">
          <BarChart data={userProgress} name='DTR Uploading Monitoring' />
        </div>
        <div className="col-span-12 space-y-10 ">
          <BarChart data={userProgress} name='Reconciliation Monitoring Statistics'/>
        </div>
        {/* <div className="col-span-12 xl:col-span-8"> */}
          <UsersActivityTable title="Users Log" data={log}/>
        {/* </div> */}
        {/* <OnlineUsersCard title='Online Users' /> */}
      </div>
    </>
  );
};

export default UserMonitoring;
