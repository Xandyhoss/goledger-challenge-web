import axios from "../utils/axiosConfig";

const getTeamByKeyService = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "team",
        "@key": key,
      },
    },
  });
  return response.data.result;
};

const getAllTeamsService = async () => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "team",
      },
    },
  });
  return response.data.result;
};

const createTeam = async (name: string) => {
  const response = await axios.post("/invoke/createAsset", {
    asset: [
      {
        "@assetType": "team",
        name: name,
        id: Math.floor(2022000000000 + Math.random() * 900000000),
      },
    ],
  });
  return response.data.result;
};

const updateTeam = async (name: string, key: string) => {
  const response = await axios.post("/invoke/updateAsset", {
    update: {
      "@assetType": "team",
      name: name,
      "@key": key,
    },
  });
  return response.data.result;
};

export { getTeamByKeyService, getAllTeamsService, createTeam, updateTeam };
