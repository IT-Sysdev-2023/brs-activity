import dayjs from 'dayjs';
import { DtrUploadingHistoryTypes } from '../../../types';

const DtrUploadingHistoryChart: React.FC<DtrUploadingHistoryTypes> = ({ title, data, columns, onChangePage }) => {

  const formatDate = (date: string) => {
    return dayjs(date).format('MMM D, YYYY');
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between ">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
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

        {data.data?.map((item: { [key: string]: any }) => (
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
                {item.causer.name}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.description}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">null</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {item.description}
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
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            onClick={(e) => {
              e.preventDefault();
              onChangePage('prev');
            }}
            className={`${!data.prev_page_url && 'pointer-events-none'} cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
          >
            Previous
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              onChangePage('next');
            }}
            className={`${!data.next_page_url && 'pointer-events-none'}cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium"> {data.from} </span>
              to
              <span className="font-medium"> {data.to} </span>
              of
              <span className="font-medium"> {data.total} </span>
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {data.links?.map((item: any) => (
                <nav
                  key={item.label}
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  {item.label.includes('Previous') && (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        onChangePage('prev');
                      }}
                      className={`${!data.prev_page_url && 'pointer-events-none text-stroke'} cursor-pointer hover:bg-secondary hover:text-white relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                  {!item.label.includes('Previous') &&
                    !item.label.includes('Next') && (
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          onChangePage(item.label);
                        }}
                        className={`${item.active && 'pointer-events-none bg-meta-5 text-white'} cursor-pointer hover:bg-secondary hover:text-white relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                      >
                        {item.label}
                      </a>
                    )}

                  {item.label.includes('Next') && (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        onChangePage('next');
                      }}
                      className={`${!data.next_page_url && 'pointer-events-none text-stroke'} cursor-pointer hover:bg-secondary hover:text-white relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </nav>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DtrUploadingHistoryChart;
