import { useEffect, useState } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ws from '../../../ws';
import BarChart from '../../../components/Dashboard/BarChart';
import { useWsOnlineUsers } from '../../Helper';
import ReconciliationHistoryChart from '../../../components/Dashboard/Realtime Monitoring/ReconciliationHistoryChart';
import { ChartTypes, DataPoint } from '../../../types';

const RealtimeDtrMonitoring = () => {
  const [userProgressDtr, setUserProgressDtr] = useState<DataPoint[]>([]);
  const [reconciliationHistory, setReconciliationHistory] =
    useState<ChartTypes>({ columns: [], data: [] });
  const [isFiltered, setFiltered] = useState(true);
  const [page, setPage] = useState(1);

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
    uploadingDtrListen();
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
          <BarChart data={userProgressDtr} name="DTR Uploading" />
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

export default RealtimeDtrMonitoring;
