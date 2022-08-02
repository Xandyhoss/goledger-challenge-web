import { Modal } from "@mui/material";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  getDriversByKeyService,
  updateDriver,
} from "../../services/DriversServices";
import {
  getAllTeamsService,
  getTeamByKeyService,
} from "../../services/TeamsServices";
import { tryCatch } from "../../services/TryCatch";
import { toastEmit } from "../../utils/toastEmitter";
import { Team } from "../../utils/types";
import { ModalLoading } from "../ModalLoading";

export default function EditDriverModal(props: any) {
  const { id, method } = useParams<{ id: string; method: string }>();
  const [teams, setTeams] = useState<Team[]>([]);

  const [name, setName] = useState("");
  const [driverTeam, setDriverTeam] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const parseEditData = async () => {
    try {
      setModalLoading(true);
      const driver = await getDriversByKeyService(id as string);
      setName(driver[0].name);
      const team = await getTeamByKeyService(driver[0].team["@key"]);
      setDriverTeam(team[0]["@key"]);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (name != "" && driverTeam != "") {
      try {
        setModalLoading(true);
        const data = await updateDriver(name, driverTeam, id as string);
        toastEmit({ type: "success", message: "Driver saved!" });
      } catch (error) {
        console.log(error);
        toastEmit({ type: "error", message: "Something went wrong :(" });
      } finally {
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  const getAllTeams = async () => {
    const data = await tryCatch(getAllTeamsService, setModalLoading, "");
    setTeams(data);
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
    parseEditData();
  }, [method]);

  return (
    <>
      <Modal open={props.open} onClose={() => closeModal()}>
        <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
          <div className="flex justify-between items-center">
            {modalLoading && <ModalLoading />}
            <p className="text-red-500 text-3xl font-bold">Edit driver</p>
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
                name="team"
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
              onClick={(e) => handleSubmit(e)}
            >
              edit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
