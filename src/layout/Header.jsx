import React, { useEffect, useState } from "react";
import {
	Box,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	List,
	ListItem,
	Text,
	Container,
	Image,
	HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getUserAccounts } from "../api/userAccountService";
import { getUserInfo } from "../api/userInfoService";

function Header({ onSelectCustomer }) {
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [results, setResults] = useState([]);

	useEffect(() => {
		const loadData = async () => {
			const response = await getUserAccounts();
			if (response && response.data) {
				setSelectedUsers(response.data);
			}
		};

		loadData();
	}, []);

	const handleSelectUser = async (account) => {
		console.log("Seçilən Hesab:", account);

		const data = await getUserInfo(account);

		if (data) {
			console.log("Data:", data);
		}
	};

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase().trim();
		setSearchValue(term);

		if (term === "") {
			setResults([]);
			return;
		}

		// Filtrləmə məntiqi: Ad, Soyad və ya Profil üzrə
		const filtered = selectedUsers.filter((data) => {
			const accounts = data.account?.toLowerCase() || "";
			const firstName = data.name?.toLowerCase() || "";
			const lastName = data.lastname?.toLowerCase() || "";

			return (
				firstName.startsWith(term) ||
				lastName.startsWith(term) ||
				accounts.includes(term)
			);
		});

		// Sıralama məntiqi: Axtarılan sözlə başlayanlar öndə gəlsin
		const sortedResults = filtered.sort((a, b) => {
			const aFirst = a.name.toLowerCase();
			const bFirst = b.name.toLowerCase();

			if (aFirst.startsWith(term) && !bFirst.startsWith(term)) return -1;
			if (!aFirst.startsWith(term) && bFirst.startsWith(term)) return 1;

			return aFirst.localeCompare(bFirst);
		});

		setResults(sortedResults); // Performans üçün ilk 10 nəticəni göstərək
	};

	return (
		<Box
			bg="#121A21"
			py={4}
			color="#E2E8F0"
			position="relative"
			zIndex={1000}
			borderBottom="1px solid rgba(79, 209, 197, 0.1)"
		>
			<Container maxW="full" px={8}>
				<Flex justify="space-between" align="center">
					<HStack spacing={4}>
						<Image
							src="/logo.ico"
							alt="Logo"
							boxSize="40px"
							borderRadius="full"
							objectFit="contain"
						/>
						<Heading as="h1" size="lg" letterSpacing="tight">
							Bein Systems
						</Heading>
					</HStack>
					<Box position="relative" w="400px">
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<SearchIcon color="gray.500" />
							</InputLeftElement>
							<Input
								placeholder="Müştəri axtar (Ad, Soyad və ya Profil)..."
								bg="rgba(255, 255, 255, 0.05)"
								border="1px solid"
								borderColor="#2D3748"
								color="white"
								_hover={{ borderColor: "#4FD1C5" }}
								_focus={{
									borderColor: "#4FD1C5",
									boxShadow:
										"0 0 8px rgba(79, 209, 197, 0.3)",
									bg: "rgba(255, 255, 255, 0.08)",
								}}
								value={searchValue}
								onChange={handleSearch}
							/>
						</InputGroup>

						{results.length > 0 && (
							<List
								position="absolute"
								top="110%"
								w="100%"
								bg="#1A222B"
								border="1px solid #2D3748"
								boxShadow="0 10px 25px rgba(0,0,0,0.5)"
								borderRadius="md"
								color="white"
								maxH="300px"
								overflowY="auto"
								zIndex="1001"
							>
								{results.map((data) => (
									<ListItem
										key={data}
										p={3}
										borderBottom="1px solid rgba(255,255,255,0.05)"
										_hover={{
											bg: "rgba(79, 209, 197, 0.1)",
											cursor: "pointer",
											color: "#4FD1C5",
										}}
										onClick={() => {
											onSelectCustomer(data);
											setResults([]);
											setSearchValue("");
										}}
									>
										<Text fontSize="xs" color="gray.400">
											{data.account}
										</Text>
										<Text fontWeight="bold" fontSize="sm">
											{data.name} {data.lastname}
										</Text>
										<Text fontSize="xs" color="gray.400">
											{data.email}
										</Text>
									</ListItem>
								))}
							</List>
						)}
					</Box>
					<Box w="100px" /> {/* Balans üçün boşluq */}
				</Flex>
			</Container>
		</Box>
	);
}

export default Header;
