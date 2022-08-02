import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDriversService } from "../services/DriversServices";
import { tryCatch } from "../services/TryCatch";
import { Driver } from "../utils/types";
import { DriverItem } from "./DriverItem";
import { Loading } from "./Loading";
import CreateDriverModal from "./modals/CreateDriverModal";

export function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>();
  const [loading, setLoading] = useState(false);

  //Modal Handler
  const navigate = useNavigate();
  const [createDriversModal, setCreateTeamsModal] = useState(false);

  const handleModal = (condition: boolean) => {
    condition === true ? navigate("/drivers/create") : navigate("/drivers");
    setCreateTeamsModal(condition);
  };

  const getDriversData = async () => {
    const data = await tryCatch(getDriversService, setLoading, "");
    data.sort((a: Driver, b: Driver) => a.id - b.id);
    setDrivers(data);
  };

  useEffect(() => {
    getDriversData();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <CreateDriverModal
        open={createDriversModal}
        handleModal={handleModal}
        setLoading={setLoading}
      />
      <div className="min-w-full flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl text-red-500 font-bold">Drivers</h1>
          <div
            className="bg-red-500 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
            onClick={() => handleModal(true)}
          >
            <PlusCircle size={25} className="mr-1" />
            create driver
          </div>
        </div>
        <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
          {drivers?.map((driver, index) => {
            return (
              <DriverItem key={index} driver={driver} setLoading={setLoading} />
            );
          })}
        </div>
      </div>
    </>
  );
}
