import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarsByDriverKey } from "../services/CarsServices";
import { getDriversByKeyService } from "../services/DriversServices";
import { getTeamByKeyService } from "../services/TeamsServices";
import { toastEmit } from "../utils/toastEmitter";
import { Car, Driver, Team } from "../utils/types";
import { CarsList } from "./CarsList";
import { Loading } from "./Loading";
import DeleteModal from "./modals/DeleteModal";
import EditDriverModal from "./modals/EditDriverModal";

export function DriverPage() {
  //Modal Handler
  const navigate = useNavigate();
  const [editDriversModal, setEditDriversModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const [driver, setDriver] = useState<Driver>();
  const [team, setTeam] = useState<Team>();
  const [cars, setCars] = useState<Car[]>([]);

  const handleModal = (
    condition: boolean,
    method: "edit" | "delete",
    id: string | null
  ) => {
    id !== null ? navigate(`/driver/${id}/${method}`) : navigate(-1);
    if (condition === true) {
      method !== "delete"
        ? setEditDriversModal(condition)
        : setDeleteModal(condition);
    } else {
      setEditDriversModal(condition);
      setDeleteModal(condition);
    }
  };

  const getAllData = async () => {
    try {
      setLoading(true);
      const driver = await getDriversByKeyService(id as string);
      setDriver(driver[0]);
      const cars = await getCarsByDriverKey(id as string);
      setCars(cars);
      const team = await getTeamByKeyService(driver[0].team["@key"]);
      setTeam(team[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {driver && team && cars && (
        <>
          <EditDriverModal open={editDriversModal} handleModal={handleModal} />
          <DeleteModal
            open={deleteModal}
            assetType="driver"
            handleModal={handleModal}
          />
          <div className="min-w-full flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-5xl text-red-500 font-bold">
                {driver?.name}
              </h1>
              <div className="flex gap-x-4">
                <div
                  className="bg-red-500 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
                  onClick={() => handleModal(true, "edit", id as string)}
                >
                  <Pencil size={25} className="mr-1" />
                  edit driver
                </div>
                <div
                  className="bg-gray-900 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
                  onClick={() =>
                    cars.length === 0
                      ? handleModal(true, "delete", id as string)
                      : toastEmit({
                          type: "error",
                          message:
                            "You only can delete players that have no cars.",
                        })
                  }
                >
                  <Trash size={25} className="mr-1" />
                  delete driver
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center h-auto mt-4 gap-y-5 bg-white p-10">
              <div className="flex gap-x-1">
                {driver?.team["@key"] ? (
                  <>
                    <p className="text-red-500 text-4xl font-bold">Team</p>
                    <p className="text-gray-900 text-4xl font-bold">
                      {team?.name}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 text-4xl font-bold">
                      This driver isn't in a team.
                    </p>
                  </>
                )}
              </div>
              <CarsList cars={cars as Car[]} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
