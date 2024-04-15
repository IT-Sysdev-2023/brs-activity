import { useAppDispatch } from '../app/hooks';
import {
  setOnlineUser,
  addOnlineUser,
  removeOnlineUser,
} from '../app/features/OnlineUsers';
import ws from '../ws';

export function useWsOnlineUsers() {
  const dispatch = useAppDispatch();

  const subscribe = () => {
    ws.join('online.users')
      .here((user: any) => dispatch(setOnlineUser(user)))
      .joining(async (user: any) => dispatch(addOnlineUser(user)))
      .leaving(async (user: any) => dispatch(removeOnlineUser(user)));
  };
  subscribe();
}

export function duration(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString).getTime();

  // Current time
  const currentTime = new Date().getTime();

  // Calculate the difference
  const difference = currentTime - date;

  // Convert difference to hours, minutes, seconds
  const millisecondsInHour = 1000 * 60 * 60;
  const millisecondsInMinute = 1000 * 60;
  const millisecondsInSecond = 1000;

  const hours = Math.floor(difference / millisecondsInHour);
  const remainingMillisecondsAfterHours = difference % millisecondsInHour;
  const minutes = Math.floor(
    remainingMillisecondsAfterHours / millisecondsInMinute,
  );
  const remainingMillisecondsAfterMinutes =
    remainingMillisecondsAfterHours % millisecondsInMinute;
  const seconds = Math.floor(
    remainingMillisecondsAfterMinutes / millisecondsInSecond,
  );

  return hours === 0
    ? `${minutes} min, ${seconds} sec.`
    : minutes === 0 && hours === 0
      ? `${seconds} seconds.`
      : `${hours} hours, ${minutes} min, ${seconds} sec.`;
}
