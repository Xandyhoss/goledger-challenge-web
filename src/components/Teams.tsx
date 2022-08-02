import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTeamsService } from "../services/TeamsServices";
import { tryCatch } from "../services/TryCatch";
import { Team } from "../utils/types";
import { Loading } from "./Loading";
import CreateTeamModal from "./modals/CreateTeamModal";
import { TeamItem } from "./TeamItem";

export function Teams() {
  const [teams, setTeams] = useState<Team[]>();
  const [loading, setLoading] = useState(false);

  //Modal Handler
  const navigate = useNavigate();
  const [createTeamsModal, setCreateTeamsModal] = useState(false);

  const handleModal = (condition: boolean) => {
    condition === true ? navigate("/teams/create") : navigate("/teams");
    setCreateTeamsModal(condition);
  };

  const getTeamsData = async () => {
    const data = await tryCatch(getAllTeamsService, setLoading, "");
    setTeams(data);
  };

  useEffect(() => {
    getTeamsData();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <CreateTeamModal open={createTeamsModal} handleModal={handleModal} />
      <div className="min-w-full flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl text-red-500 font-bold">Teams</h1>
          <div
            className="bg-red-500 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
            onClick={() => handleModal(true)}
          >
            <PlusCircle size={25} className="mr-1" />
            create team
          </div>
        </div>
        <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
          {teams?.map((team, index) => {
            return <TeamItem key={index} team={team} setLoading={setLoading} />;
          })}
        </div>
      </div>
    </>
  );
}
