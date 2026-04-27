import React, { useState, useEffect } from "react";
import {
	Box,
	VStack,
	HStack,
	Heading,
	Text,
	Icon,
	Badge,
	Divider,
	Flex,
	Button,
	useToast,
} from "@chakra-ui/react";
import { MdAnalytics, MdPowerSettingsNew, MdTrendingUp } from "react-icons/md";
import Modules from "./Modules";

// Məlumat qutuları üçün ortaq komponent
const DataBox = ({ label, value, color = "#718096" }) => (
	<Box
		border="1px solid"
		borderColor="#2D3748"
		borderRadius="lg"
		p={3}
		bg="rgba(255, 255, 255, 0.02)"
		minW="150px"
		flex="1"
	>
		<Text fontSize="xs" color="gray.500" mb={1} textTransform="uppercase">
			{label}
		</Text>
		<Text color={color} fontSize="sm" fontWeight="bold">
			{value}
		</Text>
	</Box>
);

function Home({ customerData: initialData }) {
	const [data, setData] = useState(initialData);
	const [companyModules, setCompanyModules] = useState({});
	const toast = useToast();

	// Kənardan gələn müştəri dəyişəndə state-i yenilə
	useEffect(() => {
		setData(initialData);
	}, [initialData]);

	// Sessiyanı tamamilə təmizləyən funksiya
	const handleEndSession = () => {
		setData(null);
		setCompanyModules({}); // Bütün Modules cədvəllərini silir

		toast({
			title: "Sessiya sonlandırıldı.",
			status: "warning",
			duration: 3000,
			isClosable: true,
			position: "top-right",
		});
	};

	const cardStyle = {
		w: "100%",
		bg: "#1A222B",
		p: 6,
		borderRadius: "16px",
		border: "1px solid",
		borderColor: "#2D3748",
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
	};

	return (
		<VStack
			spacing={6}
			w="90%"
			p={6}
			align="stretch"
			bg="#0F172A"
			minH="100vh"
		>
			{/* 1. MÜŞTƏRİ MƏLUMATLARI KARTI */}
			<Box
				{...cardStyle}
				borderLeft="4px solid"
				borderLeftColor={data ? "#4FD1C5" : "red.500"}
			>
				<HStack spacing={6} align="start" w="100%">
					<Icon
						as={MdAnalytics}
						w={12}
						h={12}
						p={2.5}
						borderRadius="xl"
						bg="#111827"
						color="#4FD1C5"
					/>

					<VStack align="start" spacing={5} w="100%">
						<HStack justifyContent="space-between" w="100%">
							<Heading size="md" color="white">
								Müştəri Paneli
							</Heading>
							{data && (
								<HStack spacing={3}>
									<Button
										size="sm"
										colorScheme="red"
										variant="outline"
										leftIcon={<MdPowerSettingsNew />}
										onClick={handleEndSession}
									>
										Sessiyanı Bitir
									</Button>
								</HStack>
							)}

							<Button
								size="sm"
								colorScheme="cyan"
								variant="outline"
							>
								Kredit Ver
							</Button>
							<Button
								size="sm"
								colorScheme="cyan"
								variant="outline"
							>
								Tarixce
							</Button>
						</HStack>

						<Divider borderColor="#2D3748" />

						{data ? (
							<Flex wrap="wrap" gap={4} w="100%">
								<DataBox
									label="Müştəri"
									value={`${data.ad}`}
									color="white"
								/>
								<DataBox
									label="Müştəri"
									value={`${data.soyad}`}
									color="white"
								/>
								<DataBox
									label="Profil"
									value={data.profil}
									color="#4FD1C5"
								/>
								<DataBox label="E-poçt" value={data.email} />
								<DataBox label="Telefon" value={data.telefon} />
								<DataBox
									label="Balans"
									value={`${data.balans} AZN`}
									color="yellow.400"
								/>
								<DataBox
									label="Qeydiyyat Tarixi"
									value={data.qeydiyyat_tarixi}
								/>
								<DataBox
									label="Aylıq Tarif"
									value={data.ayliq_tarif}
								/>
							</Flex>
						) : (
							<Text color="gray.500" fontStyle="italic">
								Aktiv müştəri tapılmadı.
							</Text>
						)}
					</VStack>
				</HStack>
			</Box>

			{/* 2. ŞİRKƏT MODULLARI (Dinamik Cədvəllər) */}
			<Modules
				companyModules={companyModules}
				setCompanyModules={setCompanyModules}
			/>

			{/* 3. MONİTORİNG MODULU */}
			<Box
				{...cardStyle}
				borderTop="2px solid"
				borderTopColor={data ? "#4FD1C5" : "gray.600"}
			>
				<HStack spacing={6} align="start">
					<Icon
						as={MdTrendingUp}
						w={12}
						h={12}
						p={2.5}
						borderRadius="xl"
						bg="#111827"
						color="#4FD1C5"
					/>
					<VStack align="start" spacing={3} w="100%">
						<Heading
							as="h4"
							size="sm"
							color="#FFFFFF"
							letterSpacing="widest"
						>
							SİSTEM MONİTORİNQİ
						</Heading>
						<Divider borderColor="gray.700" />
						<Text fontSize="md" color="#718096">
							{data
								? `${data.ad} ${data.soyad} üçün real-vaxt metrikləri və modul keçidləri izlənilir.`
								: "Sessiya bağlıdır. Sistem metrikləri gözləmə rejimindədir."}
						</Text>
						{data && (
							<Badge
								colorScheme="green"
								variant="subtle"
								fontSize="10px"
							>
								Live Connection: Stable
							</Badge>
						)}
					</VStack>
				</HStack>
			</Box>
		</VStack>
	);
}

export default Home;
