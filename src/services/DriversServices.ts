import axios from "../utils/axiosConfig";

const getDriversService = async () => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "driver",
      },
    },
  });
  return response.data.result;
};

const getDriversByKeyService = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "driver",
        "@key": key,
      },
    },
  });
  return response.data.result;
};

const getDriversByTeam = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "driver",
        team: {
          "@key": key,
        },
      },
    },
  });
  return response.data.result;
};

const createDriver = async (name: string, team: string) => {
  const response = await axios.post("/invoke/createAsset", {
    asset: [
      {
        "@assetType": "driver",
        name: name,
        id: Math.floor(2022000000000 + Math.random() * 900000000),
        team: {
          "@key": team,
        },
      },
    ],
  });
  return response.data.result;
};

const updateDriver = async (name: string, team: string, key: string) => {
  const response = await axios.post("/invoke/updateAsset", {
    update: {
      "@assetType": "driver",
      name: name,
      "@key": key,
      team: {
        "@key": team,
      },
    },
  });
  return response.data.result;
};

export {
  getDriversService,
  createDriver,
  getDriversByKeyService,
  updateDriver,
  getDriversByTeam,
};
