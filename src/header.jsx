import React, { useState } from "react";
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
import MOCK_CUSTOMERS from "./data/customers.json";
import BeinLogo from "./logo.ico";

function Header({ onSelectCustomer }) {
	const [searchValue, setSearchValue] = useState("");
	const [results, setResults] = useState([]);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase().trim();
		setSearchValue(term);

		if (term === "") {
			setResults([]);
			return;
		}

		// Filtrləmə məntiqi: Ad, Soyad və ya Profil üzrə
		const filtered = MOCK_CUSTOMERS.filter((c) => {
			const firstName = c.ad?.toLowerCase() || "";
			const lastName = c.soyad?.toLowerCase() || "";
			const profile = c.profil?.toLowerCase() || "";

			return (
				firstName.startsWith(term) ||
				lastName.startsWith(term) ||
				profile.includes(term)
			);
		});

		// Sıralama məntiqi: Axtarılan sözlə başlayanlar öndə gəlsin
		const sortedResults = filtered.sort((a, b) => {
			const aFirst = a.ad.toLowerCase();
			const bFirst = b.ad.toLowerCase();

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
							src={BeinLogo}
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
								zIndex={1001}
							>
								{results.map((c) => (
									<ListItem
										key={c.id}
										p={3}
										borderBottom="1px solid rgba(255,255,255,0.05)"
										_hover={{
											bg: "rgba(79, 209, 197, 0.1)",
											cursor: "pointer",
											color: "#4FD1C5",
										}}
										onClick={() => {
											onSelectCustomer(c);
											setResults([]);
											setSearchValue("");
										}}
									>
										<Text fontWeight="bold" fontSize="sm">
											{c.ad} {c.soyad}
										</Text>
										<Text fontSize="xs" color="gray.400">
											{c.profil} • {c.email}
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
