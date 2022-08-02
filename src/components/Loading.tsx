import { Spinner } from "phosphor-react";

export function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 w-[100vw] h-[100vh] bg-black bg-opacity-80 flex items-center justify-center">
      <Spinner size={70} className="animate-spin text-red-500"/>
    </div>
  );
}
