export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  attachment?: {
    name: string;
    type: string;
    uri: string;
  };
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
}; 