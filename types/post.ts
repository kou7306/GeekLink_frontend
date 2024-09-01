export interface Post {
  id: string;
  userid: string;
  content: string;
  timestamp: Date;
  reactions: {
    [emoji: string]: string[]; // Array of user IDs for each emoji
  };
}
