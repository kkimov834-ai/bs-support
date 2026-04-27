import { useState, useEffect } from "react";

const useAuthCheck = () => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [isLoading, setIsLoading] = useState(!token);

	useEffect(() => {
		const checkToken = () => {
			const currentToken = localStorage.getItem("token");

			if (!currentToken) {
				const urlParams = new URLSearchParams(window.location.search);
				const newToken = urlParams.get("data");

				if (newToken) {
					localStorage.setItem("token", newToken);
					window.location.replace(window.location.origin);
					return;
				}

				const redirectUri = encodeURIComponent(
					window.location.origin + "/",
				);
				window.location.href = `https://auth.beinsystems.az?redirect_uri=${redirectUri}`;
			} else {
				setToken(currentToken);
				setIsLoading(false);
			}
		};

		checkToken();
	}, []);

	return { token, isLoading };
};

export default useAuthCheck;
