import { Modal } from "@mui/material";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { createTeam } from "../../services/TeamsServices";
import { toastEmit } from "../../utils/toastEmitter";
import { ModalLoading } from "../ModalLoading";

export default function CreateTeamModal(props: any) {
  const [name, setName] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (name != "") {
      try {
        setModalLoading(true);
        const data = await createTeam(name);
        toastEmit({ type: "success", message: "Team Created!" });
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
  return (
    <Modal open={props.open} onClose={() => closeModal()}>
      <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
        {modalLoading && <ModalLoading />}
        <div className="flex justify-between items-center">
          <p className="text-red-500 text-3xl font-bold">Create team</p>
          <X size={35} className="text-red-500" onClick={() => closeModal()} />
        </div>
        <form className="flex flex-col w-full mt-5">
          <div className="flex flex-col mb-4">
            <label className="text-gray-900 font-bold text-xl">Name</label>
            <input
              name="name"
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
            create
          </button>
        </form>
      </div>
    </Modal>
  );
}
