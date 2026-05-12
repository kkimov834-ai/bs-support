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
import { userProfiles } from "./api/userProfilesService";
import { getUserHistory } from "./api/userHistoryService";
import { getUserModules } from "./api/userModulesService";

function App() {
	// 1. Auth Statusunu Yoxlayırıq
	const { token, isLoading } = useAuthCheck();

	// 2. Müştəri Seçim State-i
	const [userAccounts, setUserAccounts] = useState(null);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [history, setHistory] = useState([]);
	const [profiles, setProfiles] = useState(null);
	const [userModules, setUserModules] = useState([])
	const [customerLoading, setCustomerLoading] = useState(false);

	const handleUserSearch = async () => {};

	const readCustomerInfo = async (customer) => {
    setCustomerLoading(true);
    try {
        // Hər üç məlumatı paralel şəkildə alırıq
        const [userInfo, userProfilesData, userHistory, userModules] = await Promise.all([
            getUserInfo(customer.account),
            userProfiles(customer.account),
			getUserHistory(customer.account),
			getUserModules(customer.account)
        ]);

        // State-ləri yeniləyirik
        setSelectedCustomer(userInfo);
        setProfiles(userProfilesData);
		setHistory(userHistory.data);
		setUserModules(userModules)

    } catch (error) {
        console.error("Məlumat gətirilərkən xəta:", error);
        setSelectedCustomer(null);
        setProfiles([]);
		setHistory([]);
		setUserModules([]);
    } finally {
        setCustomerLoading(false);
    }
};

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
									userHistory={history}
									profileUsers={profiles}
									userModules={userModules}
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
