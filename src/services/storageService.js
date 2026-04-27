const KEY = "companyModules_v1";

export function loadCompanies(initial) {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return initial;
		return JSON.parse(raw);
	} catch (e) {
		console.error("loadCompanies error", e);
		return initial;
	}
}

export function saveCompanies(companies) {
	try {
		localStorage.setItem(KEY, JSON.stringify(companies));
	} catch (e) {
		console.error("saveCompanies error", e);
	}
}
