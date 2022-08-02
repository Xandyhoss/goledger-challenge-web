import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCarsService } from "../services/CarsServices";
import { tryCatch } from "../services/TryCatch";
import { Car } from "../utils/types";
import { CarItem } from "./CarItem";
import { Loading } from "./Loading";
import CarModal from "./modals/CarModal";
import DeleteModal from "./modals/DeleteModal";

export function Cars() {
  //Modal Handler
  const navigate = useNavigate();
  const [carModal, setCarModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cars, setCars] = useState<Car[]>([]);

  const handleModal = (
    condition: boolean,
    method: "create" | "edit" | "delete" | "",
    id: number | null
  ) => {
    id !== null
      ? navigate(`/cars/${method}/${id}`)
      : navigate(`/cars/${method}`);
    if (condition === true) {
      method !== "delete" ? setCarModal(condition) : setDeleteModal(condition);
    } else {
      setCarModal(condition);
      setDeleteModal(condition);
    }
  };

  const getCarsData = async () => {
    const data = await tryCatch(getCarsService, setLoading, "");
    setCars(data);
  };

  useEffect(() => {
    getCarsData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <CarModal
        open={carModal}
        handleModal={handleModal}
        setLoading={setLoading}
      />
      <DeleteModal
        open={deleteModal}
        assetType="car"
        handleModal={handleModal}
      />
      <div className="min-w-full flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl text-red-500 font-bold">Cars</h1>
          <div
            className="bg-red-500 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
            onClick={() => handleModal(true, "create", null)}
          >
            <PlusCircle size={25} className="mr-1" />
            create car
          </div>
        </div>
        <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
          {cars.map((car) => {
            return (
              <CarItem
                car={car}
                key={car["@key"]}
                setLoading={setLoading}
                handleModal={handleModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
