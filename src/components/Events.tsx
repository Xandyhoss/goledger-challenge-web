import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventItem } from "./EventItem";
import { Loading } from "./Loading";
import DeleteModal from "./modals/DeleteModal";
import EventModal from "./modals/EventModal";
import { getEventsService } from "../services/EventsServices";
import { tryCatch } from "../services/TryCatch";
import { Event } from "../utils/types";

export function Events() {
  //Modal Handler
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventModal, setEventModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModal = (
    condition: boolean,
    method: "create" | "edit" | "delete" | "",
    id: number | null
  ) => {
    id !== null
      ? navigate(`/events/${method}/${id}`)
      : navigate(`/events/${method}`);
    if (condition === true) {
      method !== "delete"
        ? setEventModal(condition)
        : setDeleteModal(condition);
    } else {
      setEventModal(condition);
      setDeleteModal(condition);
    }
  };

  const getEventsData = async () => {
    const data = await tryCatch(getEventsService, setLoading, "");
    setEvents(data);
  };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <EventModal
        open={eventModal}
        handleModal={handleModal}
        setLoading={setLoading}
      />
      <DeleteModal
        open={deleteModal}
        assetType="event"
        handleModal={handleModal}
      />
      <div className="min-w-full flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl text-red-500 font-bold">Events</h1>
          <div
            className="bg-red-500 hover:bg-red-700 transition-colors p-3 rounded-full h-12 flex items-center"
            onClick={() => handleModal(true, "create", null)}
          >
            <PlusCircle size={25} className="mr-1" />
            create event
          </div>
        </div>
        <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
          {events.map((event) => {
            return (
              <EventItem
                key={event["@key"]}
                event={event}
                handleModal={handleModal}
                setLoading={setLoading}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
