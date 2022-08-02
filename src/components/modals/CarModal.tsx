import { Modal } from "@mui/material";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createCar,
  getCarByKeyService,
  updateCar,
} from "../../services/CarsServices";
import { getDriversService } from "../../services/DriversServices";
import { tryCatch } from "../../services/TryCatch";
import { toastEmit } from "../../utils/toastEmitter";
import { Driver } from "../../utils/types";
import { ModalLoading } from "../ModalLoading";

type PropsType = {
  open: boolean;
  handleModal: Function;
  setLoading: Function;
};

export default function CarModal(props: PropsType) {
  const [drivers, setDrivers] = useState<Driver[]>();
  const [modalLoading, setModalLoading] = useState(false);

  const [model, setModel] = useState("");
  const [carDriver, setCarDriver] = useState("");

  const { method, id } = useParams<{ method: string; id: string }>();

  const getAllDrivers = async () => {
    const data = await tryCatch(getDriversService, props.setLoading, "");
    setDrivers(data);
  };

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (model != "" && carDriver != "") {
      try {
        setModalLoading(true);
        const data = await createCar(model, carDriver);
        toastEmit({ type: "success", message: "Car created!" });
      } catch (error) {
        console.log(error);
        toastEmit({ type: "error", message: "Something went wrong :(" });
      } finally {
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  const handleEdit = async (event: FormEvent) => {
    event?.preventDefault();
    if (model != "" && carDriver != "") {
      try {
        setModalLoading(true);
        const data = await updateCar(id as string, model, carDriver);
        toastEmit({ type: "success", message: "Car saved!" });
      } catch (error) {
        console.log(error);
        toastEmit({ type: "error", message: "Something went wrong :(" });
      } finally {
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  const parseEditData = async () => {
    if (method === "edit") {
      try {
        setModalLoading(true);
        const data = await getCarByKeyService(id as string);
        setModel(data[0].model);
        setCarDriver(data[0].driver["@key"]);
      } catch (error) {
        console.log(error);
      } finally {
        setModalLoading(false);
      }
    }
  };

  const clearForm = () => {
    setModel("");
    setCarDriver("");
  };

  const closeModal = () => {
    clearForm();
    props.handleModal(false, "", null);
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  useEffect(() => {
    parseEditData();
    clearForm();
  }, [method]);

  return (
    <Modal open={props.open} onClose={() => closeModal()}>
      <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
        {modalLoading && <ModalLoading />}
        <div className="flex justify-between items-center">
          {method == "create" ? (
            <p className="text-red-500 text-3xl font-bold">Create car</p>
          ) : (
            <p className="text-red-500 text-3xl font-bold">Edit car</p>
          )}
          <X size={35} className="text-red-500" onClick={() => closeModal()} />
        </div>
        <form className="flex flex-col w-full mt-5">
          <div className="flex flex-col mb-4">
            <label className="text-gray-900 font-bold text-xl">Model</label>
            <input
              name="model"
              value={model}
              type="text"
              className="h-10 text-xl text-gray-900 px-5"
              placeholder="Type the car name"
              onChange={(e) => setModel(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-gray-900 font-bold text-xl">Driver</label>
            <select
              name="driver"
              value={carDriver}
              className="h-10 text-xl text-gray-900 px-5"
              onChange={(e) => setCarDriver(e.target.value)}
            >
              <option value={""} disabled>
                Select a driver
              </option>
              {drivers?.map((driver, index) => {
                return (
                  <option key={index} value={driver["@key"]}>
                    {driver.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-2xl p-1 rounded-full w-[70%] self-center mt-5"
            onClick={method === "create" ? handleSubmit : handleEdit}
          >
            {method == "create" ? "create" : "edit"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
