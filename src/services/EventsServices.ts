import axios from "../utils/axiosConfig";

const getEventsService = async () => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "event",
      },
    },
  });
  return response.data.result;
};

const getEventByKeyService = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "event",
        "@key": key,
      },
    },
  });
  return response.data.result;
};

const getEventsByTeam = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "event",
        winner: {
          "@key": key,
        },
      },
    },
  });
  return response.data.result;
};

const createEvent = async (
  name: string,
  date: string,
  winner: string,
  prize: number
) => {
  const response = await axios.post("/invoke/createAsset", {
    asset: [
      {
        "@assetType": "event",
        name: name,
        date: `${date}:00Z`,
        prize: prize,
        winner: {
          "@key": winner,
        },
      },
    ],
  });
  return response.data.result;
};

const updateEvent = async (eventId: string, winner: string, prize: number) => {
  const response = await axios.post("/invoke/updateAsset", {
    update: {
      "@assetType": "event",
      "@key": eventId,
      prize: prize,
      winner: {
        "@key": winner,
      },
    },
  });
  return response.data.result;
};

export {
  getEventsService,
  createEvent,
  getEventByKeyService,
  updateEvent,
  getEventsByTeam,
};
