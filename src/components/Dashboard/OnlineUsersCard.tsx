import { Link } from 'react-router-dom';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';
import { useAppSelector } from '../../app/hooks';
// import UserFiv2e from '../../images/user/user-05.png';

interface OnlineUsersInterface {
  title?: string;
}
const OnlineUsersCard: React.FC<OnlineUsersInterface> = ({ title }) => {
  const defaultValue = useAppSelector((state) => state.onlineUsers.onlineUsers);

//   const duration = 
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div>
         {/* <ul>
            {defaultValue.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul> */}
          {
            
            defaultValue.map(item => (
                <Link
                key={item.id}
                to="/"
                className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
              >
                <div className="relative h-14 w-14 rounded-full">
                <img src={item.image} alt={item.name} className='rounded-full'/>
                  <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span>
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
                      <span className="text-xs">&nbsp;&nbsp; {item.logged_in_at}</span>
                    </p>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-medium text-white">3</span>
                  </div>
                </div>
              </Link>
            ))
          }
       
      </div>
    </div>
  );
};

export default OnlineUsersCard;
