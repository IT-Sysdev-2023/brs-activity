import { useEffect, useState } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ws from '../../../ws';
import BarChart from '../../../components/Dashboard/BarChart';
import { useWsOnlineUsers } from '../../Helper';
import ReconciliationHistoryChart from '../../../components/Dashboard/Realtime Monitoring/ReconciliationHistoryChart';
import { ChartTypes, DataPoint } from '../../../types';

const RealTimeMonitoring = () => {
  const [userProgressReconciliation, setUserProgressReconciliation] = useState<
    DataPoint[]
  >([]);
  const [reconciliationHistory, setReconciliationHistory] =
    useState<ChartTypes>({ columns: [], data: [] });
  const [isFiltered, setFiltered] = useState(true);
  const [page, setPage] = useState(1);

  useWsOnlineUsers();

  useEffect(() => {
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
    reconciliationListen();
  }, []);

  useEffect(() => {
    const reconciliationHistory = async () => {
      const res = await axios.get(`reconciliation-history?page=${page}`, {
        params: {
          filter: isFiltered,
        },
      });
      setReconciliationHistory(res.data);
    };

    reconciliationHistory();
  }, [isFiltered, page]);

  const filterRecord = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'yearly') {
      setFiltered(false);
    } else {
      setFiltered(true);
    }
  };

  const changePage = (page: number | string) => {
    if (page === 'prev') {
      setPage((prev) => prev - 1);
    } else if (page === 'next') {
      setPage((prev) => prev + 1);
    } else {
      setPage(Number(page));
    }
  };
  return (
    <>
      <Breadcrumb pageName="Real-Time Monitoring Statistics" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 space-y-10 ">
          <BarChart
            data={userProgressReconciliation}
            name="Reconciliation Monitoring Statistics"
          />
        </div>
        <ReconciliationHistoryChart
          filterRecord={filterRecord}
          title="Reconciliation History"
          data={reconciliationHistory.data}
          columns={reconciliationHistory.columns}
          onChangePage={changePage}
        />
      </div>
    </>
  );
};

export default RealTimeMonitoring;
