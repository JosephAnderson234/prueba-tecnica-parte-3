import { getAllCases } from "@/services/case/getAll";
import CardList from '../../components/cases/CaseList';
import CreateModal from '../../components/modals/HandleCreateModal';

export default async function Home() {
	const allCases = await getAllCases();
	
	
	if (allCases.status === 'error' || !allCases.data) {
		throw new Error(allCases.message || 'Error loading cases');
	}
	const cases = allCases.data;
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
			<div className="container mx-auto px-4 py-12">
				<div className="mb-12 text-center">
					<h1 className="text-5xl font-bold text-text mb-4 tracking-tight">
						Gestión de Casos
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Administra y da seguimiento a todos tus casos de manera eficiente
					</p>
					<div className="mt-6 h-1 w-24 bg-base-primary mx-auto rounded-full"></div>
				</div>
				<div className="my-5">
					<CreateModal />
				</div>
				<CardList listCardData={cases} />
			</div>
		</div>
	);
}
