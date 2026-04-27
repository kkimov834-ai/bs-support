import React, { useState, useEffect, useCallback, useMemo } from "react";
import { VStack } from "@chakra-ui/react";
import {
	AVAILABLE_MODULES,
	COMPANIES,
	INITIAL_STATE,
} from "./data/availableModules";
import CompanySelector from "./components/CompanySelector";
import ModuleSelect from "./components/ModuleSelect";
import ModuleTable from "./components/ModuleTable";

/**
 * Modules - Ana komponent
 * Şirkətlər üçün modulları seçmə və idarə etmə
 */
function Modules() {
	// State Management
	const [selectedCompany, setSelectedCompany] = useState("Zentra");
	const [previousCompany, setPreviousCompany] = useState("Zentra");
	const [companyModules, setCompanyModules] = useState(INITIAL_STATE);

	// localStorage-dan məlumatları yükləmə
	useEffect(() => {
		const savedModules = localStorage.getItem("companyModules");
		if (savedModules) {
			try {
				setCompanyModules(JSON.parse(savedModules));
			} catch (error) {
				console.error("localStorage yükləmədə xəta:", error);
			}
		}
	}, []); // Only on mount

	// companyModules dəyişdikdə localStorage-ə saxla
	useEffect(() => {
		localStorage.setItem("companyModules", JSON.stringify(companyModules));
	}, [companyModules]); // Only depends on companyModules

	/**
	 * Şirkət seçimi dəyişdikdə
	 * useCallback ile memoized - dependency'leri minimal
	 */
	const handleSelectCompany = useCallback((newCompany) => {
		setSelectedCompany((prev) => {
			setPreviousCompany(prev);
			return newCompany;
		});
	}, []); // No dependencies

	/**
	 * Modul əlavə etmə
	 * useCallback ile memoized
	 */
	const handleSelectModule = useCallback(
		(moduleId) => {
			if (!moduleId) return;

			const moduleToAdd = AVAILABLE_MODULES.find(
				(m) => m.id === moduleId,
			);

			setCompanyModules((prev) => {
				// Dublikat kontrolu
				if (
					moduleToAdd &&
					!prev[selectedCompany].find((m) => m.id === moduleId)
				) {
					return {
						...prev,
						[selectedCompany]: [
							...prev[selectedCompany],
							moduleToAdd,
						],
					};
				}
				return prev;
			});
		},
		[selectedCompany],
	);

	/**
	 * Modul silmə
	 * useCallback ile memoized
	 */
	const handleRemoveModule = useCallback(
		(moduleId) => {
			setCompanyModules((prev) => ({
				...prev,
				[selectedCompany]: prev[selectedCompany].filter(
					(m) => m.id !== moduleId,
				),
			}));
		},
		[selectedCompany],
	);

	/**
	 * Bütün modulları sıfırla
	 * useCallback ile memoized
	 */
	const handleResetAll = useCallback(() => {
		setCompanyModules((prev) => ({
			...prev,
			[selectedCompany]: [],
		}));
	}, [selectedCompany]);

	// useMemo ile cari company modullarını memoize et
	const currentCompanyModules = useMemo(
		() => companyModules[selectedCompany] || [],
		[companyModules, selectedCompany],
	);

	// useMemo ile evvelki company modullarını memoize et
	const previousCompanyModules = useMemo(
		() => companyModules[previousCompany] || [],
		[companyModules, previousCompany],
	);

	// useMemo ile mövcud modulları filter et
	const availableModulesToSelect = useMemo(
		() =>
			AVAILABLE_MODULES.filter(
				(m) => !currentCompanyModules.find((sm) => sm.id === m.id),
			),
		[currentCompanyModules],
	);

	return (
		<VStack spacing={6} w="100%" align="stretch">
			{/* Şirkət Seçicisi */}
			<CompanySelector
				selectedCompany={selectedCompany}
				companies={COMPANIES}
				onSelectCompany={handleSelectCompany}
			/>

			{/* Cədvəllər Bölümü */}
			<VStack spacing={6} w="100%" align="stretch">
				{/* CARİ ŞİRKƏT CƏDVƏLI */}
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

				{/* ÖNCƏKİ ŞİRKƏT CƏDVƏLI */}
				{previousCompany && previousCompany !== selectedCompany && (
					<ModuleTable
						modules={previousCompanyModules}
						title={`Evvelki Tarif (${previousCompany})`}
						moduleCount={previousCompanyModules.length}
						onRemoveModule={handleRemoveModule}
						showResetButton={false}
					/>
				)}
			</VStack>
		</VStack>
	);
}

export default Modules;
