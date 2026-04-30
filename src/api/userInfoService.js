import api from "./api";

export const getUserInfo = async (acc) => {
	try {
		const reponse = await api.post("user/info", {
			account: acc,
		});
		return reponse.data;
	} catch {
		console.log("User Info xətası:");
		return;
	}
};
