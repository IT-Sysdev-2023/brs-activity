import dayjs from 'dayjs';

const ReconciliationHistoryChart: React.FC<{
  title?: string;
  data: any[];
  columns: string[];
}> = ({ title, data, columns }) => {

    const formatDate = (date: string) => {
        return dayjs(date).format('MMM D, YYYY')
    };
    const formatMonthYear = (date: string) => {
        
        return dayjs(date, 'MM-YYYY').format('MMM YYYY')
    };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between ">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title} ({data?.length})
        </h4>
        {/* <h4 className="font-semibold">{date}</h4> */}
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          {columns?.map((item) => (
            <div className="p-2.5 text-center xl:p-5" key={item}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {item}
              </h5>
            </div>
          ))}
        </div>

        {data?.map((item) => (
          <div
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            key={item.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={`${process.env.APP_URL}/storage/user_images/${item.causer.id}`}
                    alt={item.id}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {
                  item.causer.name
                }
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">
                {item.bank_account.title}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {formatMonthYear(item.properties.month)}
              </p>
            </div>
             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {formatDate(item.created_at)}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconciliationHistoryChart;
