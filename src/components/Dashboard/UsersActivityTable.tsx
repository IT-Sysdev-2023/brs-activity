import dayjs from 'dayjs';
import {
  defaultOnlineUsers,
  duration,
  isLoggedInOrOut,
} from '../../pages/Helper';

const UsersActivityTable: React.FC<{
  title?: string;
  data: any[];
  columns: string[];
}> = ({ title, data, columns }) => {
  const useOnlineUsers = defaultOnlineUsers();
  const date = dayjs().format('MMM D, YYYY');

  const formatDate = (date: string) => {
    return dayjs(date).format('h:mm A');
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between ">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title} ({data?.length})
        </h4>
        <h4 className="font-semibold">{date}</h4>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          {columns.map((item) => (
            <div className="p-2.5 text-center xl:p-5" key={item}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {item}
              </h5>
            </div>
          ))}
        </div>

        {data.map((item) => (
          <div
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            key={item.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={`https://bankrs.com/storage/user_images/${item.id}`}
                    alt={item.id}
                    className="w-full h-full object-cover"
                  />
                </div>
                {useOnlineUsers.some((onlineId) => onlineId.id === item.id) && (
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: '#21d973' }}
                  ></div>
                )}
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {
                  item.action[Object.keys(item.action)[0]].details.details
                    .employee_name
                }
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {item.action[Object.keys(item.action)[0]].ip[0]}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">
                {formatDate(item.action['logged_in']?.created_at)}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {duration(
                  item.action['logged_in']?.created_at,
                  item.action['logged_out']?.created_at,
                )}
              </p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                className={`${
                  isLoggedInOrOut(
                    item.action['logged_in']?.created_at,
                    item.action['logged_out']?.created_at,
                  )
                    ? 'text-meta-3'
                    : 'text-meta-1'
                }`}
              >
                {isLoggedInOrOut(
                  item.action['logged_in']?.created_at,
                  item.action['logged_out']?.created_at,
                )
                  ? 'Logged In'
                  : 'logged Out'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersActivityTable;
