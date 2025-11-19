import { Case } from '../../interfaces/cases/index';
import CaseCard from './CaseCard';
export default function CardList({listCardData}: {listCardData: Case[]}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listCardData.map((caseData) => (
                <CaseCard key={caseData.id} data={caseData} />
            ))}
        </div>
    );
}