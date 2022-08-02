import { format } from "date-fns";
import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { getTeamByKeyService } from "../services/TeamsServices";
import { tryCatch } from "../services/TryCatch";
import { Event, Team } from "../utils/types";

type PropsType = {
  event: Event;
  handleModal: Function;
  setLoading: Function;
};

export function EventItem(props: PropsType) {
  const [team, setTeam] = useState<Team>();

  const getTeamData = async () => {
    const data = await tryCatch(
      getTeamByKeyService,
      props.setLoading,
      props.event.winner["@key"]
    );
    setTeam(data[0]);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  return (
    <>
      {team && (
        <div className="w-full h-auto bg-white rounded-lg p-5 px-10 flex items-center hover:bg-gray-100 transition-colors">
          <div className="w-full flex justify-between">
            <div className="w-[40%]">
              <p className="text-red-500 text-4xl font-bold">
                {props.event.name}
              </p>
              <p className="text-gray-900 text-2xl font-bold">
                {format(new Date(props.event.date), "dd/MM/yyyy - HH'h'mm")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-900 text-2xl font-bold">prize</p>
              <p className="text-red-500 text-3xl font-bold">
                ${props.event.prize.toLocaleString("en-EN")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-3xl font-bold">WINNER</p>
              <p className="text-gray-900 text-2xl font-bold">{team?.name}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-10">
            <Pencil
              size={25}
              className="text-gray-900"
              onClick={() =>
                props.handleModal(true, "edit", props.event["@key"])
              }
            />
            <Trash
              size={25}
              className="text-red-500"
              onClick={() =>
                props.handleModal(true, "delete", props.event["@key"])
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
