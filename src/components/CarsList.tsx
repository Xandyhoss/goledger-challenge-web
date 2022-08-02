import { Car } from "../utils/types";

type PropsType = {
  cars: Car[];
};

export function CarsList(props: PropsType) {
  return (
    <div className="flex flex-col items-center gap-y-2 w-full">
      <div className="w-full max-w-[65%] flex flex-col items-center">
        <p className="text-3xl font-bold text-gray-900 self-start">Cars</p>
        <ul className="list-none text-2xl text-red-500 w-full">
          {props.cars.length > 0
            ? props.cars.map((car, index) => {
                return (
                  <li key={index} className="border-t-2 py-1">
                    {car.model}
                  </li>
                );
              })
            : 'This driver has no cars.'}
        </ul>
      </div>
    </div>
  );
}
