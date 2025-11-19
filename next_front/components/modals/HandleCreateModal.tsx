"use client";

import { useState } from "react";
import MyModal from '../common/Modal';
import CreateCardForm from '../forms/CreateCardForm';
import { useRouter } from "next/navigation";

export default function CreateModal() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();


    const handlerOnClose = () => {
        setIsOpen(false);
        router.refresh();
    }

    return (
        <>

            <div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-base-primary text-white rounded-lg hover:bg-base-primary-dark transition-colors font-semibold"
                >
                    Crear Nuevo Caso
                </button>
            </div>

            <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Crear Nuevo Caso">
                <CreateCardForm onClose={handlerOnClose} />
            </MyModal>
        </>
    )
}