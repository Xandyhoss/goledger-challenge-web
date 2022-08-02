import { Route, Routes } from "react-router-dom";
import { Cars } from "./components/Cars";
import { DriverPage } from "./components/DriverPage";
import { Drivers } from "./components/Drivers";
import { Events } from "./components/Events";
import { Home } from "./components/Home";
import { TeamPage } from "./components/TeamPage";
import { Teams } from "./components/Teams";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/events" element={<Events />}>
        <Route path="/events/:method" element={<Events />}>
          <Route path="/events/:method/:id" element={<Events />} />
        </Route>
      </Route>

      <Route path="/drivers" element={<Drivers />}>
        <Route path="/drivers/:method" element={<Drivers />} />
      </Route>

      <Route path="/driver/:id" element={<DriverPage />}>
        <Route path="/driver/:id/:method" element={<DriverPage />} />
      </Route>

      <Route path="/cars" element={<Cars />}>
        <Route path="/cars/:method" element={<Cars />}>
          <Route path="/cars/:method/:id" element={<Cars />} />
        </Route>
      </Route>

      <Route path="/teams" element={<Teams />}>
        <Route path="/teams/:method" element={<Events />} />
      </Route>

      <Route path="/team/:id" element={<TeamPage />}>
        <Route path="/team/:id/:method" element={<TeamPage />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
