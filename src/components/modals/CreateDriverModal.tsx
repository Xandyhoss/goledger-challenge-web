import { Modal } from "@mui/material";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { createDriver } from "../../services/DriversServices";
import { getAllTeamsService } from "../../services/TeamsServices";
import { tryCatch } from "../../services/TryCatch";
import { toastEmit } from "../../utils/toastEmitter";
import { Team } from "../../utils/types";
import { ModalLoading } from "../ModalLoading";

type PropsType = {
  open: boolean;
  handleModal: Function;
  setLoading: Function;
};

export default function CreateDriverModal(props: PropsType) {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState<Team[]>();
  const [modalLoading, setModalLoading] = useState(false);

  const [driverTeam, setDriverTeam] = useState("");

  const getAllTeams = async () => {
    const data = await tryCatch(getAllTeamsService, props.setLoading, "");
    setTeams(data);
  };

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (name != "" && driverTeam != "") {
      try {
        setModalLoading(true);
        const data = await createDriver(name, driverTeam);
        toastEmit({ type: "success", message: "Driver Created!" });
      } catch (error) {
        console.log(error);
        toastEmit({ type: "error", message: "Something went wrong :(" });
      } finally {
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  const clearForm = () => {
    setName("");
    setDriverTeam("");
  };

  const closeModal = () => {
    clearForm();
    props.handleModal(false, "", null);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <>
      <Modal open={props.open} onClose={() => closeModal()}>
        <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
          {modalLoading && <ModalLoading />}
          <div className="flex justify-between items-center">
            <p className="text-red-500 text-3xl font-bold">Create driver</p>
            <X
              size={35}
              className="text-red-500"
              onClick={() => closeModal()}
            />
          </div>
          <form className="flex flex-col w-full mt-5">
            <div className="flex flex-col mb-4">
              <label className="text-gray-900 font-bold text-xl">Name</label>
              <input
                name="name"
                value={name}
                type="text"
                className="h-10 text-xl text-gray-900 px-5"
                placeholder="Type the driver name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-900 font-bold text-xl">Team</label>
              <select
                name="driverTeam"
                value={driverTeam}
                className="h-10 text-xl text-gray-900 px-5"
                onChange={(e) => setDriverTeam(e.target.value)}
              >
                <option value={""} disabled>
                  Select a team
                </option>
                {teams?.map((team, index) => {
                  return (
                    <option key={index} value={team["@key"]}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-2xl p-1 rounded-full w-[70%] self-center mt-5"
              onClick={handleSubmit}
            >
              create
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
