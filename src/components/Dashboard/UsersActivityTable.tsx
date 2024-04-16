import { useEffect, useState } from 'react';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { defaultOnlineUsers } from '../../pages/Helper';
import axios from '../../http/axios';

const UsersActivityTable: React.FC<{ title?: string, data: any }> = ({ title, data }) => {
  const [log, setLog] = useState([]);


  const useOnlineUsers = defaultOnlineUsers();

  useEffect(() => {
    const usersLog = async () => {
      const res = await axios.get('users-log');
      setLog(res.data);
      // console.log(res)
    }

    usersLog();
  }, []);
  // console.log(useOnlineUsers);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ip Address
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Time In
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Cumulative Login Time
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {log.map((item) => (
          <div
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            key={item.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="relative h-14 w-14 rounded-full">
                <img src={`https://dev.bankrs.com/storage/user_images/${item.user_id}`} alt="Brand" className="rounded-full"/>
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {item.details?.details.employee_name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {item.ip}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">{item.action}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">590</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-3">Active</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersActivityTable;
