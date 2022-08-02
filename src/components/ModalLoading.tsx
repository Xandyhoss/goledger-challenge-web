import { Spinner } from "phosphor-react";

export function ModalLoading() {
  return (
    <>
      <div className="absolute flex justify-center items-center bg-black opacity-70 w-full h-full top-0 left-0 rounded-3xl">
        <Spinner size={40} className="text-red-500 animate-spin " />
      </div>
    </>
  );
}
