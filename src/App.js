import React, { use, useEffect, useState } from "react";
import { ChakraProvider, Flex, Box, Center, Spinner } from "@chakra-ui/react";
import useAuthCheck from "./useAuthCheck";
import Header from "./header";
import Sidebar from "./sidebar";
import AISection from "./aiSection";
import Modules from "./home";

function App() {
	// 1. Auth Statusunu Yoxlayırıq
	const { token, isLoading } = useAuthCheck();

	// 2. Müştəri Seçim State-i
	const [selectedCustomer, setSelectedCustomer] = useState(() => {
		const savedCustomer = localStorage.getItem("selectedCustomer");
		return savedCustomer ? JSON.parse(savedCustomer) : null;
	});

	useEffect(() => {
		if (selectedCustomer) {
			localStorage.setItem(
				"selectedCustomer",
				JSON.stringify(selectedCustomer),
			);
		} else {
			localStorage.removeItem("selectedCustomer");
		}
	}, [selectedCustomer]);

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
					onSelectCustomer={(customer) =>
						setSelectedCustomer(customer)
					}
					token={token}
				/>

				<Flex flex={1} overflow="hidden">
					<Sidebar />

					<Box flex={1} p={6} bg="#0F171E" overflowY="auto">
						<Flex h="full" gap={6}>
							<Box flex={1}>
								{/* Modules-ə seçilmiş datanı ötürürük */}
								<Modules customerData={selectedCustomer} />
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
