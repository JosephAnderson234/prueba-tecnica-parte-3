"use client";

import { Case } from "@/interfaces/cases";
import { UpdateCardForm } from '../forms/UpdateCardForm';

export default function CasePage({data}:{data:Case}){
    


    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <UpdateCardForm initialData={data} />
        </div>
    );
}