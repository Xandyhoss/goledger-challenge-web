import { ToastContainer } from "react-toastify";
import { Nav } from "./components/Nav";
import { Router } from "./Router";

function App() {
  return (
    <div className="bg-blur min-h-screen bg-cover bg-fixed bg-no-repeat flex flex-col items-center">
      <div className="w-full min-h-screen max-w-[1100px] flex flex-col items-center p-10">
        <ToastContainer className="absolute top-5" />
        <Nav />
        <div className="w-full min-h-[80vh] mt-10 flex">
          <Router />
        </div>
      </div>
    </div>
  );
}

export default App;
