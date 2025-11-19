"use client";

import { Case } from "@/interfaces/cases";
import { UpdateCardForm } from '../forms/UpdateCardForm';

export default function CasePage({data}:{data:Case}){
    return <UpdateCardForm initialData={data} />;
}