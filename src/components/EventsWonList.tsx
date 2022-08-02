import { Event } from "../utils/types";

type PropsType = {
  events: Event[];
};

export function EventsWonList(props: PropsType) {
  return (
    <>
      {props.events && (
        <>
          <div className="flex flex-col items-center gap-y-5 w-full">
            <p className="text-3xl font-bold text-red-500">Events Won</p>
            <div className="w-full flex justify-center">
              <ul className="list-none text-2xl text-gray-900 w-full max-w-[65%]">
                {props.events.length > 0
                  ? props.events.map((event, index) => {
                      return (
                        <li key={index} className="border-t-2 py-1">
                          {event.name}
                        </li>
                      );
                    })
                  : "This team hasn't won any event."}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
