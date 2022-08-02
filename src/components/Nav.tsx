import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/img/logo.png";

export function Nav() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-center">
      <nav className="flex items-center w-full">
        <img
          src={logo}
          className="w-[318px] mr-[100px]"
          onClick={() => navigate("/")}
        />
        <ul className="flex w-full justify-between text-2xl text-gray-900">
          <li
            className="hover:text-red-500 transition-colors"
            onClick={() => navigate("/events")}
          >
            events
          </li>
          <li
            className="hover:text-red-500 transition-colors"
            onClick={() => navigate("/drivers")}
          >
            drivers
          </li>
          <li
            className="hover:text-red-500 transition-colors"
            onClick={() => navigate("/cars")}
          >
            cars
          </li>
          <li
            className="hover:text-red-500 transition-colors"
            onClick={() => navigate("/teams")}
          >
            teams
          </li>
        </ul>
      </nav>
    </header>
  );
}
