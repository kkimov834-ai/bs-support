// Mövcud modullar - Static data
export const AVAILABLE_MODULES = [
	{
		id: 1,
		ad: "Müştəri Modulu",
		qiymet: 100,
		ayliq: 100,
	},
	{
		id: 2,
		ad: "Anbar Modulu",
		qiymet: 150,
		ayliq: 150,
	},
	{
		id: 3,
		ad: "Maliyyə Modulu",
		qiymet: 200,
		ayliq: 200,
	},
	{
		id: 4,
		ad: "Kuryer Modulu",
		qiymet: 80,
		ayliq: 80,
	},
	{
		id: 5,
		ad: "QR Menu Sistemi",
		qiymet: 120,
		ayliq: 120,
	},
];

export const COMPANIES = ["Akul", "Zentra", "Dine", "NexAI"];

// Represent companies as an array of objects { name, modules: [] }
export const INITIAL_COMPANIES = COMPANIES.map((c) => ({
	name: c,
	modules: [],
}));
