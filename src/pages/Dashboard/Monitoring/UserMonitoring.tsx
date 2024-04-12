import { useEffect, useId, useState } from 'react';
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

const UserMonitoring: React.FC = () => {
  const [userProgress, setUserProgress] = useState([]);

  const dispatch = useAppDispatch();
  const defaultValue = useAppSelector((state) => state.onlineUsers.onlineUsers);

  useEffect(() => {
    ws.join('online.users')
      .here((user: any) => dispatch(setOnlineUser(user)))
      .joining(async (user: any) => dispatch(addOnlineUser(user)))
      .leaving(async (user: any) => dispatch(removeOnlineUser(user)));

    const uploadingDtrListen = () => {
      ws.private('admin-dtr-uploading').listen(
        '.dtr-inserted-event',
        (event: any) => {
          const { currentRow, totalRows, userId } = event;

          const percentage = (currentRow / totalRows) * 100;

          // setUserProgress([{x: userId, y: percentage}]);
          setUserProgress((prevProgress) => {
            const checkId = prevProgress.some((item) => item.x === userId);

            if (!checkId) {
              return [...prevProgress, { x: userId, y: percentage }];
            } else {
              return [{ x: userId, y: percentage }];
            }
          });

          // if(indexToUpdate !== -1){
          //   // setUserProgress([ {x: userId, y: percentage}])
          //   console.log(userProgress);
          // }else{
          // console.log(defaultValue.find(item => item.id === userId));
          // }
          // setUserProgress((prevProgress) => [
          //   ...prevProgress.filter((item) => item.x !== userId),
          //   { x: userId, y: percentage },
          // ]);
        },
      );
    };

    uploadingDtrListen();
  }, []);

  // console.log(defaultValue.find(item => item.id === userId));

  return (
    <>
      <Breadcrumb pageName="DTR Uploading Monitoring" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 space-y-10">
          <BarChart users={defaultValue} data={userProgress} />
          <ul>
            {/* {defaultValue.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))} */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserMonitoring;
