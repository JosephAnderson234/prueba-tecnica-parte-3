import CasePage from "@/components/cases/CasePage";
import { getCaseById } from "@/services/case/getById";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const caseData = await getCaseById(Number(id));
    if (caseData.status === 'error' || !caseData.data) {
        throw new Error(caseData.message || 'Case not found');
    }
    const data = caseData.data;

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <CasePage data={data} />
        </div>
    );
}
