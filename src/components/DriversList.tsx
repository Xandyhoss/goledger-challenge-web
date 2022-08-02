import { Driver } from "../utils/types";

type PropsType = {
  drivers: Driver[];
};

export function DriversList(props: PropsType) {
  return (
    <>
      {props.drivers && (
        <>
          <div className="flex flex-col items-center gap-y-5 w-full">
            <p className="text-3xl font-bold text-red-500">Drivers</p>
            <div className="w-full flex justify-center">
              <ul className="list-none text-2xl text-gray-900 w-full max-w-[65%]">
                {props.drivers.length > 0
                  ? props.drivers.map((driver, index) => {
                      return (
                        <li key={index} className="border-t-2 py-1">
                          {driver.name}
                        </li>
                      );
                    })
                  : "There are no drivers registered in this team."}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
