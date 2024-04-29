import { Link } from 'react-router-dom';
import { duration } from '../pages/Helper';

const ChatCard:React.FC<{onlineUsers: any[]}> = ({onlineUsers}) => {


  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Online Users
      </h4>

      <div className="overflow-auto max-h-[400px]">

        {onlineUsers.map(item => (
          <Link
          key={item.id}
          to="/"
          className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
        >
          <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={`${process.env.APP_URL}/storage/user_images/${item.id}`} alt={item.id} className='w-full h-full object-cover' />
                <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span>
                </div>
            </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium text-black dark:text-white">
                {item.name}
              </h5>
              <p>
                <span className="text-sm text-black dark:text-white">
                 {item.details?.employee_position}
                </span>
                <span className="text-xs"> - {duration(item.logged_in_at)}</span>
              </p>
            </div>
          </div>
        </Link>
        ))}
        
        
      </div>
    </div>
  );
};

export default ChatCard;
