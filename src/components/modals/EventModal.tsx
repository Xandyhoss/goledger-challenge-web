import { Modal } from "@mui/material";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createEvent,
  getEventByKeyService,
  updateEvent,
} from "../../services/EventsServices";
import { getAllTeamsService } from "../../services/TeamsServices";
import { tryCatch } from "../../services/TryCatch";
import { Team } from "../../utils/types";
import { format } from "date-fns";
import { ModalLoading } from "../ModalLoading";
import { toastEmit } from "../../utils/toastEmitter";
import { ToastContainer } from "react-toastify";

type PropsType = {
  open: boolean;
  handleModal: Function;
  setLoading: Function;
};

export default function EventModal(props: PropsType) {
  const [teams, setTeams] = useState<Team[]>();
  const [modalLoading, setModalLoading] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [prize, setPrize] = useState(0);
  const [winner, setWinner] = useState("");

  const { method, id } = useParams<{ method: string; id: string }>();

  const getAllTeams = async () => {
    const data = await tryCatch(getAllTeamsService, props.setLoading, "");
    setTeams(data);
  };

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (name != "" && winner != "" && date != "" && prize > 0) {
      try {
        setModalLoading(true);
        const data = await createEvent(name, date, winner, prize);
        toastEmit({ type: "success", message: "Event Created!" });
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
    if (name != "" && winner != "" && date != "" && prize > 0) {
      try {
        setModalLoading(true);
        const data = await updateEvent(id as string, winner, prize);
        toastEmit({ type: "success", message: "Event saved!" });
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
        const data = await getEventByKeyService(id as string);
        setName(data[0].name);
        setDate(format(new Date(data[0].date), "yyyy-MM-dd'T'HH:mm"));
        setPrize(data[0].prize);
        setWinner(data[0].winner["@key"]);
      } catch (error) {
        console.log(error);
      } finally {
        setModalLoading(false);
      }
    }
  };

  const clearForm = () => {
    setName("");
    setDate("");
    setPrize(0);
    setWinner("");
  };

  const closeModal = () => {
    clearForm();
    props.handleModal(false, "", null);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    parseEditData();
    clearForm();
  }, [method]);

  return (
    <>
      <Modal open={props.open} onClose={() => closeModal()}>
        <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
          {modalLoading && <ModalLoading />}
          <div className="flex justify-between items-center">
            {method == "create" ? (
              <p className="text-red-500 text-3xl font-bold">Create event</p>
            ) : (
              <p className="text-red-500 text-3xl font-bold">Edit event</p>
            )}
            <X
              size={35}
              className="text-red-500"
              onClick={() => closeModal()}
            />
          </div>
          <form className="flex flex-col w-full mt-5">
            {method !== "edit" && (
              <>
                <div className="flex flex-col mb-4">
                  <label className="text-gray-900 font-bold text-xl">
                    Name
                  </label>
                  <input
                    value={name}
                    name="name"
                    type="text"
                    className="h-10 text-xl text-gray-900 px-5"
                    placeholder="Type the event name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-gray-900 font-bold text-xl">
                    Date
                  </label>
                  <input
                    name="date"
                    value={date}
                    type="datetime-local"
                    className="h-10 text-xl text-gray-900 px-5"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex flex-col mb-4">
              <label className="text-gray-900 font-bold text-xl">Prize</label>
              <input
                name="prize"
                type="number"
                min="1"
                value={prize}
                className="h-10 text-xl text-gray-900 px-5"
                placeholder="Type the event prize"
                onChange={(e) => setPrize(e.target.valueAsNumber)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-900 font-bold text-xl">
                Winner team
              </label>
              <select
                name="winner"
                value={winner}
                className="h-10 text-xl text-gray-900 px-5"
                onChange={(e) => setWinner(e.target.value)}
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
              onClick={method === "create" ? handleSubmit : handleEdit}
            >
              {method == "create" ? "create" : "edit"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
