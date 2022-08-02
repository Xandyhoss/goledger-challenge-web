import { Modal } from "@mui/material";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamByKeyService, updateTeam } from "../../services/TeamsServices";
import { toastEmit } from "../../utils/toastEmitter";
import { ModalLoading } from "../ModalLoading";

export default function EditTeamModal(props: any) {
  const { id, method } = useParams<{ id: string; method: string }>();

  const [name, setName] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const parseEditData = async () => {
    try {
      setModalLoading(true);
      const team = await getTeamByKeyService(id as string);
      setName(team[0].name);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (name != "") {
      try {
        setModalLoading(true);
        const data = await updateTeam(name, id as string);
        toastEmit({ type: "success", message: "Team saved!" });
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
  };

  const closeModal = () => {
    clearForm();
    props.handleModal(false, "", null);
  };

  useEffect(() => {
    parseEditData();
  }, [method]);
  return (
    <Modal open={props.open} onClose={() => closeModal()}>
      <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
        <div className="flex justify-between items-center">
          {modalLoading && <ModalLoading />}
          <p className="text-red-500 text-3xl font-bold">Edit team</p>
          <X size={35} className="text-red-500" onClick={() => closeModal()} />
        </div>
        <form className="flex flex-col w-full mt-5">
          <div className="flex flex-col mb-4">
            <label className="text-gray-900 font-bold text-xl">Name</label>
            <input
              name="name"
              value={name}
              type="text"
              className="h-10 text-xl text-gray-900 px-5"
              placeholder="Type the team name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-2xl p-1 rounded-full w-[70%] self-center mt-5"
            onClick={handleSubmit}
          >
            edit
          </button>
        </form>
      </div>
    </Modal>
  );
}
