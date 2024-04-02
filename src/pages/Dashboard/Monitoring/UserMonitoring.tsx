import { useState, useEffect } from 'react';
import axios from '../../../http/axios';
import Breadcrumb from '../../../components/Breadcrumb';
import ChartOne from '../../../components/ChartOne';
import ws from '../../../ws';

function UserMonitoring() {
  // const [data, setData] = useState<>({
  //     users: [],
  //     date: [],
  //     month: ''
  //   });

  useEffect(() => {
    const uploadingDtrListen = async () => {
      try {
        ws.private('admin-dtr-uploading')
        .listen('.dtr-inserted-event', (event:any) => {
            console.log(event)
        });
      } catch (er) {
        console.log(er);
      }
    };
    uploadingDtrListen();
  }, []);

  return (
    <>
      <Breadcrumb pageName="DTR Uploading Monitoring" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartOne />
          {/* <VisitorsChart countUser={data.users} dayOfTheMonth={data.date} month={data.month} /> */}
        </div>
      </div>
    </>
  );
}

export default UserMonitoring;
