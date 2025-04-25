import { useEffect, useRef } from "react";

interface Props {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal= ({ isOpen, hasCloseBtn, onClose, children }: Props) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        if(!modalElement) return;

        if(isOpen) {
            modalElement.showModal();
        } else {
            modalElement.close();
        }
    }, [isOpen]);

    const handleCloseModal = () => {
        if(onClose) {
            onClose();
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if(event.key === "Escape") {
            handleCloseModal();
        };
    };

    return(
        <dialog className="mx-auto mt-5 w-150 text-center rounded-md shadow-lg backdrop:bg-gray-50/50" ref={modalRef} onKeyDown={handleKeyDown}>
            {hasCloseBtn && (
                    <div className="justify-end flex"><button className="cursor-pointer pt-1.5 pb-0.5 px-2.5 text-gray-300 hover:text-gray-500" onClick={handleCloseModal} aria-label="Close">X</button></div>
                )}
            <div className="modal-body sm:px-4 px-2">
                {children}
            </div>
                
        </dialog>)
}

export default Modal;