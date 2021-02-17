export enum SocketKey  {
  JOIN_ROOM = 'join-room',
  NEW_USER_CONNECTED = 'new-user-connected',
  LEAVE_ROOM = 'leave-room',
  USER_LEAVE = 'user-leave',
  USER_DISCONNECTED = 'user-disconnected',
  INCOMING_MESSAGE = 'incoming-message',
  OUTGOING_MESSAGE = 'outgoing-message'
};

export interface SocketJoin {
  id: string;
  user: string;
  room: string;
}

export interface ChatMessage {
  user: string;
  message: string;
}
