import { useEffect, useState } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ws from '../../../ws';
import BarChart from '../../../components/Dashboard/BarChart';
import { useWsOnlineUsers } from '../../Helper';
import ReconciliationHistoryChart from '../../../components/Dashboard/ReconciliationHistoryChart';
import { DataPoint } from '../../../types';

const RealTimeMonitoring = () => {
  const [userProgressDtr, setUserProgressDtr] = useState<DataPoint[]>([]);
  const [userProgressReconciliation, setUserProgressReconciliation] = useState<
    DataPoint[]
  >([]);
  const [reconciliationHistory, setReconciliationHistory] = useState<{
    column: string[];
    data: any;
  }>({ column: [], data: [] });

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
              const updatedProgress = [...prevProgress];
              updatedProgress[index] = {
                ...updatedProgress[index],
                y: percentage,
              };
              return updatedProgress;
            } else {
              return [
                ...prevProgress,
                { a: userId, x: username, y: percentage },
              ];
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
      const res = await axios.get('reconciliation-history');
      setReconciliationHistory(res.data);
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
        <ReconciliationHistoryChart
          title="Reconciliation History"
          data={reconciliationHistory.data}
          columns={reconciliationHistory.column}
        />
      </div>
    </>
  );
};

export default RealTimeMonitoring;
