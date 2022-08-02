import { Modal } from "@mui/material";
import { AxiosError } from "axios";
import { X } from "phosphor-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "../../utils/axiosConfig";
import { toastEmit } from "../../utils/toastEmitter";
import { ModalLoading } from "../ModalLoading";

type PropsType = {
  open: boolean;
  assetType: string;
  handleModal: Function;
};

export default function DeleteModal(props: PropsType) {
  const navigate = useNavigate();
  const [modalLoading, setModalLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const deleteData = async () => {
    try {
      setModalLoading(true);
      await axios.post("/invoke/deleteAsset", {
        key: {
          "@assetType": props.assetType,
          "@key": id,
        },
      });
      toastEmit({ type: "success", message: "Asset deleted!" });
    } catch (error: AxiosError | any) {
      console.log(error.response.data);
      toastEmit({ type: "error", message: "Something went wrong :(" });
    } finally {
      setTimeout(() => {
        handleNavigate();
      }, 1000);
    }
  };

  const handleNavigate = () => {
    switch (props.assetType) {
      case "driver":
        navigate("/drivers");
        window.location.reload();
        break;
      case "event":
        navigate("/events");
        window.location.reload();
        break;
      case "team":
        navigate("/teams");
        window.location.reload();
        break;
      case "car":
        navigate("/cars");
        window.location.reload();
        break;
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={() => props.handleModal(false, "", null)}
      >
        <div className="bg-gray-100 h-auto w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute rounded-3xl p-10 py-6 outline-none">
          {modalLoading && <ModalLoading />}
          <div className="flex justify-between items-center">
            <p className="text-red-500 text-3xl font-bold">Are you sure?</p>
            <X
              size={35}
              className="text-red-500"
              onClick={() => props.handleModal(false, "", null)}
            />
          </div>
          <p className="text-gray-900 font-bold mt-4">
            This action cannot be undone!
          </p>
          <div className="flex gap-x-4">
            <button
              type="submit"
              className="bg-red-500 text-2xl p-1 rounded-full w-full self-center mt-5"
              onClick={() => deleteData()}
            >
              delete
            </button>
            <button
              type="submit"
              className="bg-gray-900 text-2xl p-1 rounded-full w-full self-center mt-5"
              onClick={() => props.handleModal(false, "", null)}
            >
              cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
