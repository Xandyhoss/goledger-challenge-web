import axios from "../utils/axiosConfig";

const getCarsService = async () => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "car",
      },
    },
  });
  return response.data.result;
};

const getCarByKeyService = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "car",
        "@key": key,
      },
    },
  });
  return response.data.result;
};

const getCarsByDriverKey = async (key: string) => {
  const response = await axios.post("/query/search", {
    query: {
      selector: {
        "@assetType": "car",
        driver: {
          "@key": key,
        },
      },
    },
  });
  return response.data.result;
};

const createCar = async (model: string, driver: string) => {
  const response = await axios.post("/invoke/createAsset", {
    asset: [
      {
        "@assetType": "car",
        model: model,
        id: Math.floor(2022000000000 + Math.random() * 900000000),
        driver: {
          "@key": driver,
        },
      },
    ],
  });
  return response.data.result;
};

const updateCar = async (key: string, model: string, driver: string) => {
  const response = await axios.post("/invoke/updateAsset", {
    update: {
      "@assetType": "car",
      model: model,
      "@key": key,
      driver: {
        "@key": driver,
      },
    },
  });
  return response.data.result;
};

export {
  getCarsByDriverKey,
  getCarsService,
  createCar,
  getCarByKeyService,
  updateCar,
};
