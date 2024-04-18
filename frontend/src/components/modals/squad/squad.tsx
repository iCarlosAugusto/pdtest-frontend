import React, { ReactNode, useRef } from "react";
import "./style.css";
import axiosRequest from "../../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  didCreated: () => void;
}

function CreateSquadModal(props: ModalType) {

  const inputRef = useRef<HTMLInputElement>(null);

  const createSquad = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;
    if(inputRef) {
      try {
        await axiosRequest.post("/squad", {
          name: inputValue
        });
        props.didCreated();
        toast("Squad criado com sucesso!")
        props.toggle();
      } catch (error) {
        //[TO-DO] criar alert de erro
      }
    }
  }

  return (
    <>
      <ToastContainer/>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <span>Criar Squad</span>
            <form onSubmit={createSquad} className="fields">

              <input 
                ref={inputRef}
                required
                placeholder="Nome do squad"
                className="field"
              />
            
              <button type="submit">
                Criar Squad
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export { CreateSquadModal }