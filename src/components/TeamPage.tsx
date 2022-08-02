import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriversByTeam } from "../services/DriversServices";
import { getEventsByTeam } from "../services/EventsServices";
import { getTeamByKeyService } from "../services/TeamsServices";
import { toastEmit } from "../utils/toastEmitter";
import { Driver, Event, Team } from "../utils/types";
import { DriversList } from "./DriversList";
import { EventsWonList } from "./EventsWonList";
import { Loading } from "./Loading";
import DeleteModal from "./modals/DeleteModal";
import EditTeamModal from "./modals/EditTeamModal";

export function TeamPage() {
  //Modal Handler
  const navigate = useNavigate();
  const [editTeamsModal, setEditTeamsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [team, setTeam] = useState<Team>();
  const [events, setEvents] = useState<Event[]>([]);

  const handleModal = (
    condition: boolean,
    method: "edit" | "delete",
    id: string | null
  ) => {
    id !== null ? navigate(`/team/${id}/${method}`) : navigate(-1);
    if (condition === true) {
      method !== "delete"
        ? setEditTeamsModal(condition)
        : setDeleteModal(condition);
    } else {
      setEditTeamsModal(condition);
      setDeleteModal(condition);
    }
  };

  const getAllData = async () => {
    try {
      setLoading(true);
      const team = await getTeamByKeyService(id as string);
      setTeam(team[0]);
      const drivers = await getDriversByTeam(id as string);
      setDrivers(drivers);
      const events = await getEventsByTeam(id as string);
      setEvents(events);
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
      {team && drivers && events && (
        <>
          <EditTeamModal open={editTeamsModal} handleModal={handleModal} />
          <DeleteModal
            open={deleteModal}
            assetType="team"
            handleModal={handleModal}
          />
          <div className="min-w-full flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-5xl text-red-500 font-bold">Team McLaren</h1>
              <div className="flex gap-x-4">
                <div
                  className="bg-red-500 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
                  onClick={() => handleModal(true, "edit", id as string)}
                >
                  <Pencil size={25} className="mr-1" />
                  edit team
                </div>
                <div
                  className="bg-gray-900 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
                  onClick={() =>
                    drivers.length === 0 && events.length === 0
                      ? handleModal(true, "delete", id as string)
                      : toastEmit({
                          type: "error",
                          message:
                            "You only can delete teams that have no drivers and no events.",
                        })
                  }
                >
                  <Trash size={25} className="mr-1" />
                  delete team
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center h-auto mt-4 gap-y-5 bg-white p-10">
              <DriversList drivers={drivers} />
              <EventsWonList events={events} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
