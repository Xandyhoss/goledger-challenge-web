import { PlayCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDriversByTeam } from "../services/DriversServices";
import { getEventsByTeam } from "../services/EventsServices";
import { Driver, Team } from "../utils/types";

type PropsType = {
  team: Team;
  setLoading: Function;
};

export function TeamItem(props: PropsType) {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const getTeamData = async () => {
    try {
      props.setLoading(true);
      const drivers = await getDriversByTeam(props.team["@key"]);
      setDrivers(drivers);
      const events = await getEventsByTeam(props.team["@key"]);
      setEvents(events);
    } catch (error) {
      console.log(error);
    } finally {
      props.setLoading(false);
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

  return (
    <>
      {drivers && events && (
        <>
          <div
            className="w-full h-auto bg-white rounded-lg p-5 px-10 flex items-center hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/team/${props.team["@key"]}`)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col items-center">
                <p className="text-red-500 text-4xl font-bold">
                  {props.team.name}
                </p>
              </div>
              <div className="flex items-center gap-x-20">
                <p className="text-gray-900 text-2xl font-bold">
                  drivers:{drivers.length}
                </p>
                <p className="text-gray-900 text-2xl font-bold">
                  events won:{events.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-10">
              <PlayCircle size={30} className="text-red-500" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
