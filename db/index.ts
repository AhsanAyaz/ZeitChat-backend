import { getMessage, postNewMessage } from "./db";

// export const runner = (message: string, user: string) => {
//   return postNewMessage(message, user);
// };

export const loadMessages = () => getMessage();

export const postMessage = (message: string, userId: string) => postNewMessage(message, userId);

