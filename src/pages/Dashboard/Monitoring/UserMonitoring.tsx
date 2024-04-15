import { useEffect, useState } from 'react';
// import axios from '../../../http/axios';
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    const onlineUserWs = () => {
      ws.join('online.users')
        .here((user: any) => dispatch(setOnlineUser(user)))
        .joining(async (user: any) => dispatch(addOnlineUser(user)))
        .leaving(async (user: any) => dispatch(removeOnlineUser(user)));
    } 

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

    // useWsOnlineUsers();
    onlineUserWs();
    uploadingDtrListen();
  }, []);

  return (
    <>
      <Breadcrumb pageName="DTR Uploading Monitoring" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 space-y-10 ">
          <BarChart data={userProgress} />
          {/* <ul>
            {defaultValue.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul> */}
        </div>
        <div className="col-span-12 xl:col-span-8">
          <UsersActivityTable title="Activity Log"/>
        </div>
        <OnlineUsersCard title='Online Users' />
      </div>
    </>
  );
};

export default UserMonitoring;
