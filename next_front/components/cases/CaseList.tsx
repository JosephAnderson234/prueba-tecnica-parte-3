import { Case } from '../../interfaces/cases/index';
import CaseCard from './CaseCard';

export default function CardList({listCardData}: {listCardData: Case[]}) {
    if (listCardData.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">No hay casos disponibles</h3>
                <p className="text-gray-600">Crea tu primer caso para comenzar</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listCardData.map((caseData) => (
                <CaseCard key={caseData.id} data={caseData} />
            ))}
        </div>
    );
}