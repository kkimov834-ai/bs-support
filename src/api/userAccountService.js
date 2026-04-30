import api from "./api";

export const getUserAccounts = async () => {
	try {
		const response = await api.post("/user/accounts");
		return response.data;
	} catch (error) {
		console.error("User Accounts xətası:", error);
		return null;
	}
};
