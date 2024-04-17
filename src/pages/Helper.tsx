import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setOnlineUser,
  addOnlineUser,
  removeOnlineUser,
} from '../app/features/OnlineUsers';
import ws from '../ws';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';

dayjs.extend(Duration);

export const useWsOnlineUsers = () => {
  const dispatch = useAppDispatch();

  return ws
    .join('online.users')
    .here((user: any) => dispatch(setOnlineUser(user)))
    .joining(async (user: any) => dispatch(addOnlineUser(user)))
    .leaving(async (user: any) => dispatch(removeOnlineUser(user)));
};

export const isLoggedInOrOut = (timeOut: string, timeIn: string) => {
  return (timeOut === null || dayjs(timeIn).isAfter(dayjs(timeOut)) ? true : false) ;
}

export function duration(timeIn: string, timeOut?: string | null) {
  
  const currentTime = timeOut === null || dayjs(timeIn).isAfter(dayjs(timeOut)) ? dayjs() : dayjs(timeOut);
  const startingTime = dayjs(timeIn);

  // Calculate the difference in milliseconds
  const timeDifference = currentTime.diff(startingTime);

  // Convert the difference to a human-readable format
  const duration = dayjs.duration(timeDifference);

  // Get the time spent in hours, minutes, and seconds
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return hours === 0
    ? `${minutes} min, ${seconds} sec.`
    : minutes === 0 && hours === 0
      ? `${seconds} seconds.`
      : `${hours} hrs, ${minutes} min, ${seconds} sec.`;
}

export const defaultOnlineUsers = () => {
  const onlineUsers = useAppSelector((state) => state.onlineUsers.onlineUsers);
  return onlineUsers;
};
