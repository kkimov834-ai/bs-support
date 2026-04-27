// Pure company helpers
export function findCompany(companies, name) {
	return companies.find((c) => c.name === name);
}

export function addModuleToCompany(companies, companyName, moduleToAdd) {
	return companies.map((c) => {
		if (c.name !== companyName) return c;
		// prevent duplicates
		if (c.modules.some((m) => m.id === moduleToAdd.id)) return c;
		return { ...c, modules: [...c.modules, moduleToAdd] };
	});
}

export function removeModuleFromCompany(companies, companyName, moduleId) {
	return companies.map((c) => {
		if (c.name !== companyName) return c;
		return { ...c, modules: c.modules.filter((m) => m.id !== moduleId) };
	});
}

export function resetCompanyModules(companies, companyName) {
	return companies.map((c) =>
		c.name === companyName ? { ...c, modules: [] } : c,
	);
}

export function companiesWithNoModules(companies) {
	return companies.filter((c) => c.modules.length === 0).map((c) => c.name);
}
