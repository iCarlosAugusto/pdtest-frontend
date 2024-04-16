import React, { ReactNode, useRef, useState } from "react";
import "./squad.css";
import axiosRequest from "../../../utils/axios";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  didCreated: () => void;
}

export default function Modal(props: ModalType) {

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
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <span>Criar Squad</span>
            <form onSubmit={createSquad}>
                <input ref={inputRef} required/>
            
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