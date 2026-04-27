import React, { useState, useEffect, useCallback, useMemo } from "react";
import { VStack } from "@chakra-ui/react";
import {
	AVAILABLE_MODULES,
	COMPANIES,
	INITIAL_COMPANIES,
} from "./data/availableModules";
import CompanySelector from "./components/CompanySelector";
import ModuleSelect from "./components/ModuleSelect";
import ModuleTable from "./components/ModuleTable";
import * as companyService from "./services/companyService";
import * as storageService from "./services/storageService";
function Modules() {
	// companiesData holds array: [{ name, modules: [] }]
	const [companiesData, setCompaniesData] = useState(() =>
		storageService.loadCompanies(INITIAL_COMPANIES),
	);
	const [selectedCompany, setSelectedCompany] = useState(() => COMPANIES[0]);

	useEffect(() => {
		storageService.saveCompanies(companiesData);
	}, [companiesData]);

	const handleSelectCompany = useCallback((newCompany) => {
		setSelectedCompany(newCompany);
	}, []);

	const handleSelectModule = useCallback(
		(moduleId) => {
			if (!moduleId) return;
			const moduleToAdd = AVAILABLE_MODULES.find(
				(m) => m.id === moduleId,
			);
			if (!moduleToAdd) return;
			setCompaniesData((prev) =>
				companyService.addModuleToCompany(
					prev,
					selectedCompany,
					moduleToAdd,
				),
			);
		},
		[selectedCompany],
	);

	const handleRemoveModule = useCallback(
		(moduleId) => {
			setCompaniesData((prev) =>
				companyService.removeModuleFromCompany(
					prev,
					selectedCompany,
					moduleId,
				),
			);
		},
		[selectedCompany],
	);

	const handleResetAll = useCallback(() => {
		setCompaniesData((prev) =>
			companyService.resetCompanyModules(prev, selectedCompany),
		);
	}, [selectedCompany]);

	// Derived values
	const currentCompany = useMemo(
		() =>
			companyService.findCompany(companiesData, selectedCompany) || {
				modules: [],
			},
		[companiesData, selectedCompany],
	);
	const currentCompanyModules = currentCompany.modules || [];

	const availableModulesToSelect = useMemo(
		() =>
			AVAILABLE_MODULES.filter(
				(m) => !currentCompanyModules.some((sm) => sm.id === m.id),
			),
		[currentCompanyModules],
	);

	// Show selector only companies that have no modules (or the currently selected one)
	const selectableCompanyNames = useMemo(
		() =>
			companiesData
				.filter(
					(c) => c.name === selectedCompany || c.modules.length === 0,
				)
				.map((c) => c.name),
		[companiesData, selectedCompany],
	);

	return (
		<VStack spacing={6} w="100%" align="stretch">
			{/* Şirkət Seçicisi */}
			<CompanySelector
				selectedCompany={selectedCompany}
				companies={selectableCompanyNames}
				onSelectCompany={handleSelectCompany}
			/>

			{/* Cədvəllər Bölümü */}
			<VStack spacing={6} w="100%" align="stretch">
				<VStack spacing={4} w="100%" align="stretch">
					<ModuleSelect
						availableModules={availableModulesToSelect}
						selectedModules={currentCompanyModules}
						onSelectModule={handleSelectModule}
					/>
					<ModuleTable
						modules={currentCompanyModules}
						title={`Cari Tarif (${selectedCompany})`}
						moduleCount={currentCompanyModules.length}
						onRemoveModule={handleRemoveModule}
						showResetButton={true}
						onResetAll={handleResetAll}
					/>
				</VStack>

				{/* Render other companies with modules as separate tables (read-only selection) */}
				{companiesData
					.filter(
						(c) =>
							c.name !== selectedCompany && c.modules.length > 0,
					)
					.map((c) => (
						<ModuleTable
							key={c.name}
							modules={c.modules}
							title={`Tarif (${c.name})`}
							moduleCount={c.modules.length}
							onRemoveModule={(id) =>
								setCompaniesData((prev) =>
									companyService.removeModuleFromCompany(
										prev,
										c.name,
										id,
									),
								)
							}
							showResetButton={true}
							onResetAll={() =>
								setCompaniesData((prev) =>
									companyService.resetCompanyModules(
										prev,
										c.name,
									),
								)
							}
						/>
					))}
			</VStack>
		</VStack>
	);
}

export default Modules;
