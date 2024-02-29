// import { useState } from 'react';

// interface User {
//   id: number;
//   logged_in_at?: string;
//   // Add other properties as needed
// }

// // Custom hook for managing online users state and actions
// export const useOnlineUsersStore = () => {
//   const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

//   const getOnlineUsers = (): any =>
//     onlineUsers.sort((a: any, b: any) =>
//       b?.logged_in_at?.localeCompare(a?.logged_in_at),
//     );

//   const appendOnlineUsers = (user: any): void => setOnlineUsers(user);

//   const addOnlineUser = (user: any): void =>
//     setOnlineUsers((prevUsers) => [...prevUsers, user]);

//   const removeOnlineUser = (user: any): void =>
//     setOnlineUsers((prevUsers) =>
//       prevUsers.filter((onlineUser) => onlineUser.id !== user.id),
//     );

//   return {
//     appendOnlineUsers,
//     getOnlineUsers,
//     addOnlineUser,
//     removeOnlineUser,
//   };
// };
