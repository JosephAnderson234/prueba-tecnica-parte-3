import CasePage from "@/components/cases/CasePage";
import { getCaseById } from "@/services/case/getById";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const caseData = await getCaseById(Number(id));
    
    if (caseData.status === 'error' || !caseData.data) {
        // Si el error es por caso no encontrado (404), usar notFound()
        if (caseData.message?.toLowerCase().includes('not found') || 
            caseData.message?.toLowerCase().includes('no encontrado')) {
            notFound();
        }
        console.log('Error loading case:', caseData.message);
        throw new Error(caseData.message || 'Error al cargar el caso');
    }
    
    const data = caseData.data;

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <CasePage data={data} />
        </div>
    );
}
