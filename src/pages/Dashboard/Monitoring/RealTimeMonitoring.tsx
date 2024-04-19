import { useEffect, useState } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ws from '../../../ws';
import BarChart from '../../../components/Dashboard/BarChart';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import UsersActivityTable from '../../../components/Dashboard/UsersActivityTable';
import { useWsOnlineUsers } from '../../Helper';

interface UserProgress {
  a: number; // Assuming `id` is of type string
  x: string; // Assuming `username` is of type string
  y: number; // Assuming `percentage` is of type number
}

const RealTimeMonitoring: React.FC = () => {
  const [userProgressDtr, setUserProgressDtr] = useState<UserProgress[]>([]);
  const [userProgressReconciliation, setUserProgressReconciliation] = useState<UserProgress[]>(
    [],
  );
  const [log, setLog] = useState<{column: string[], data: any}>({column: [], data: []});
  
  useWsOnlineUsers();

  useEffect(() => {
    const uploadingDtrListen = () => {
      ws.private('admin-dtr-uploading').listen(
        '.dtr-inserted-event',
        (event: any) => {
          const { currentRow, totalRows, userId, username } = event;

          const percentage = Math.floor((currentRow / totalRows) * 100);

          setUserProgressDtr((prevProgress) => {
            const index = prevProgress.findIndex((item) => item.a === userId);
            if (index !== -1) {
              // Create a copy of the previous progress array
              const updatedProgress = [...prevProgress];
              // Update the percentage value of the object with the specified ID
              updatedProgress[index] = {
                ...updatedProgress[index],
                y: percentage,
              };
              // Return the updated array
              return updatedProgress;

            } else {
              // Add a new object to the progress array
              return [...prevProgress, { a: userId, x: username, y: percentage }];
            }
          });
        },
      );
    };

    const reconciliationListen = () => {
      ws.private('admin-bdo-reconciling').listen(
        '.bdo-reconciled-event',
        (event: any) => {
          const { currentRow, totalRows, username, id } = event;

          const percentage = Math.floor((currentRow / totalRows) * 100);

          setUserProgressReconciliation((prevProgress) => {
            const index = prevProgress.findIndex((item) => item.a === id);
            if (index !== -1) {
              // Create a copy of the previous progress array
              const updatedProgress = [...prevProgress];
              // Update the percentage value of the object with the specified ID
              updatedProgress[index] = {
                ...updatedProgress[index],
                y: percentage,
              };

              // if(percentage === 100){
              //   ws.leave(`admin-bdo-reconciling.${id}.${bankAccount}`);
              // }

              // Return the updated array
              return updatedProgress;

            } else {
              // Add a new object to the progress array
              return [...prevProgress, { a: id, x: username, y: percentage }];
            }
          });
        },
      );
    };

    const usersLog = async () => {
      const res = await axios.get('users-log');
      // console.log(res.data);
      setLog(res.data);
    };

    usersLog();

    reconciliationListen();
    uploadingDtrListen();
  }, []);
  return (
    <>
      <Breadcrumb pageName="Real-Time Monitoring Statistics" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 space-y-10 ">
          <BarChart data={userProgressDtr} name="DTR Uploading" />
        </div>
        <div className="col-span-12 space-y-10 ">
          <BarChart
            data={userProgressReconciliation}
            name="Reconciliation Monitoring Statistics"
          />
        </div>
        <UsersActivityTable title="Users Authentication Log" data={log.data} columns={log.column} />
        {/* <div className="col-span-12 xl:col-span-8"> */}
        {/* <UsersActivityTable title="Users Authentication Log" data={log} /> */}
        {/* </div> */}
        {/* <OnlineUsersCard title='Online Users' /> */}
        {/* <SampleChart/> */}
      </div>
    </>
  );
};

export default RealTimeMonitoring;
