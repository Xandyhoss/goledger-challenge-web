import axios from "axios";
import { PlayCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCarsByDriverKey } from "../services/CarsServices";
import { Car, Driver } from "../utils/types";

type PropsType = {
  driver: Driver;
  setLoading: Function;
};

export function DriverItem(props: PropsType) {
  const [cars, setCars] = useState<Car[]>();
  const navigate = useNavigate();

  const getCarData = async () => {
    try {
      props.setLoading(true);
      const data = await getCarsByDriverKey(props.driver["@key"]);
      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      props.setLoading(false);
    }
  };

  useEffect(() => {
    getCarData();
  }, []);
  return (
    <>
      {cars && (
        <>
          <div
            className="w-full h-auto bg-white rounded-lg p-5 px-10 flex items-center hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/driver/${props.driver["@key"]}`)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col items-center">
                <p className="text-red-500 text-4xl font-bold">
                  {props.driver.name}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-red-500 text-3xl font-bold">
                  Cars:{cars?.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-10">
              <PlayCircle size={30} className="text-red-500" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
