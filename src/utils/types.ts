type Event = {
  "@assetType": string;
  "@key": string;
  date: string;
  name: string;
  prize: number;
  winner: {
    "@assetType": string;
    "@key": string;
  };
};

type Driver = {
  "@assetType": string;
  "@key": string;
  id: number;
  name: string;
  team: {
    "@assetType": string;
    "@key": string;
  };
};

type Car = {
  "@assetType": string;
  "@key": string;
  id: number;
  model: string;
  driver: {
    "@assetType": string;
    "@key": string;
  };
};

type Team = {
  "@assetType": string;
  "@key": string;
  id: number;
  name: string;
};
export type { Event, Team, Driver, Car };
