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

export const isLoggedInOrOut = (timeIn: string, timeOut?: string) => {
  return timeOut === undefined || dayjs(timeIn).isAfter(dayjs(timeOut))
    ? true
    : false;
};

export function duration(timeIn: string, timeOut?: string | undefined) {
  const currentTime =
    timeOut === undefined || dayjs(timeIn).isAfter(dayjs(timeOut))
      ? dayjs()
      : dayjs(timeOut);
  const startingTime = dayjs(timeIn);

  // Calculate the difference in milliseconds
  const timeDifference = currentTime.diff(startingTime);

  // Convert the difference to a human-readable format
  const duration = dayjs.duration(timeDifference);

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (years > 0) {
    return `${months} years, ${months} months, ${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec.`;
  } else if (months > 0) {
    return `${months} days, ${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec.`;
  } else if (days > 0) {
    return `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec.`;
  } else if (hours > 0) {
    return `${hours} hrs, ${minutes} min, ${seconds} sec.`;
  } else if (minutes > 0) {
    return `${minutes} min, ${seconds} sec.`;
  } else {
    return `${seconds} sec.`;
  }
}

export const defaultOnlineUsers = () => {
  const onlineUsers = useAppSelector((state) => state.onlineUsers.onlineUsers);
  return onlineUsers;
};
