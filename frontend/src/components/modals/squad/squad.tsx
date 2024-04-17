import React, { ReactNode, useRef, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const createSquad = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;
    if(inputRef) {
      try {
        setIsLoading(true);
        await axiosRequest.post("/squad", {
          name: inputValue
        });
        props.didCreated();
        toast("Squad criado com sucesso!")
        props.toggle();
        setIsLoading(false);
      } catch (error) {
        //[TO-DO] criar alert de erro
      } finally {
        setIsLoading(false);
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