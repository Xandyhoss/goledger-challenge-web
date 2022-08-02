import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { getDriversByKeyService } from "../services/DriversServices";
import { tryCatch } from "../services/TryCatch";
import { Car, Driver } from "../utils/types";

type PropsType = {
  car: Car;
  handleModal: Function;
  setLoading: Function;
};

export function CarItem(props: PropsType) {
  const [driver, setDriver] = useState<Driver>();

  const getDriverData = async () => {
    const data = await tryCatch(
      getDriversByKeyService,
      props.setLoading,
      props.car.driver["@key"]
    );
    setDriver(data[0]);
  };

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <>
      {driver && (
        <div className="w-full h-auto bg-white rounded-lg p-5 px-10 flex items-center hover:bg-gray-100 transition-colors">
          <div className="w-full flex justify-between items-center">
            <div className="flex w-[40%] flex-col">
              <p className="text-red-500 text-4xl font-bold">
                {props.car.model}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-900 text-xl font-bold mb-[-5px]">
                driver
              </p>
              <p className="text-red-500 text-2xl font-bold">
                {(driver as Driver) ? driver?.name : "Undefined Driver"}
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-10">
              <Pencil
                size={25}
                className="text-gray-900"
                onClick={() =>
                  props.handleModal(true, "edit", props.car["@key"])
                }
              />
              <Trash
                size={25}
                className="text-red-500"
                onClick={() =>
                  props.handleModal(true, "delete", props.car["@key"])
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
