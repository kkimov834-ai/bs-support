import React, { useEffect, useState } from "react";
import {
	ChakraProvider,
	Flex,
	Box,
	Center,
	Spinner,
	Text,
} from "@chakra-ui/react";
import useAuthCheck from "./hooks/useAuthCheck";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import AISection from "./components/AiSection";
import Modules from "./pages/Home";
import { getUserAccounts } from "./api/userAccountService";
import { getUserInfo } from "./api/userInfoService";

function App() {
	// 1. Auth Statusunu Yoxlayırıq
	const { token, isLoading } = useAuthCheck();

	// 2. Müştəri Seçim State-i
	const [userAccounts, setUserAccounts] = useState(null);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [customerLoading, setCustomerLoading] = useState(false);

	const handleUserSearch = async () => {};

	const readCustomerInfo = async (customer) => {
		setCustomerLoading(true);
		const response = await getUserInfo(customer.account);
		if (response.status == "success") {
			setSelectedCustomer(response.data);
		} else {
			setSelectedCustomer(null);
		}

		setCustomerLoading(false);
	};

	useEffect(() => {
		const fetchUserAccounts = async () => {
			const accounts = await getUserAccounts();
			setUserAccounts(accounts);
		};
		fetchUserAccounts();
	}, []);

	// Yüklənmə və ya Yönləndirmə zamanı Spinner göstər
	if (isLoading) {
		return (
			<ChakraProvider>
				<Center h="100vh" bg="gray.50">
					<Spinner
						size="xl"
						color="blue.500"
						thickness="4px"
						speed="0.65s"
					/>
				</Center>
			</ChakraProvider>
		);
	}

	// Yalnız giriş uğurludursa Dashboard render olunur
	return (
		<ChakraProvider>
			<Flex flexDirection="column" minH="100vh">
				{/* Header-ə həm seçim funksiyasını, həm də Tokeni ötürürük */}
				<Header
					onSelectCustomer={(customer) => readCustomerInfo(customer)}
					token={token}
				/>

				<Flex flex={1} overflow="hidden">
					<Sidebar />

					<Box flex={1} p={6} bg="#0F171E" overflowY="auto">
						<Flex h="full" gap={6}>
							<Box flex={1}>
								{/* Modules-ə seçilmiş datanı ötürürük */}
								<Modules
									customerData={selectedCustomer}
									customerLoading={customerLoading}
								/>
							</Box>
							<AISection selectedUser={selectedCustomer} />
						</Flex>
					</Box>
				</Flex>
			</Flex>
		</ChakraProvider>
	);
}

export default App;
