type EventType = {
  _id: string;
  name: string;
  price: number;
  remaining?: number;
  status?: string;
};

type MemberType = {
  _id: string;
  reference: string;
  first_name: string;
  last_name: string;
};

type ContextType = {
  member: null | MemberType;
  auth_token: null | string;
  entry: null | string;
  intent: null | string;
  timer_ends: null | number;
  events: EventType[];
  basket: EventType[];
};
