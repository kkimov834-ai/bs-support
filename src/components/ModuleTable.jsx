import React from "react";
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
	VStack,
	IconButton,
	Button,
	HStack,
	Box,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";

/**
 * ModuleTable - clean, limit removed
 */
const ModuleTable = React.memo(
	({
		modules = [],
		title,
		moduleCount = 0,
		onRemoveModule,
		showResetButton,
		onResetAll,
	footer = null,
	}) => {
		return (
			<Box
				w="100%"
				bg="#1A222B"
				borderRadius="xl"
				border="1px solid"
				borderColor="#2D3748"
				p={6}
				boxShadow="2xl"
			>
				<HStack mb={6} w="100%">
					<VStack align="start" spacing={1}>
						<HStack>
							<Text color="white" fontSize="lg" fontWeight="bold">
								{title}
							</Text>
							{moduleCount > 0 && (
								<Text color="gray.400" fontSize="sm">
									{moduleCount} Tarif
								</Text>
							)}
						</HStack>
						<Text color="gray.500" fontSize="xs">
							Paketə daxil olan funksionallıqlar
						</Text>
					</VStack>
					{showResetButton && moduleCount > 0 && (
						<Button
							size="sm"
							colorScheme="red"
							variant="outline"
							onClick={onResetAll}
							ml="auto"
						>
							Hamısını Sil
						</Button>
					)}
				</HStack>

				{/* optional footer (e.g. ModuleSelect) */}
				{footer}

				<TableContainer
					border="1px solid"
					borderColor="#2D3748"
					borderRadius="lg"
				>
					<Table variant="simple" size="md">
						<Thead bg="rgba(255, 255, 255, 0.03)">
							<Tr>
								<Th color="gray.400" borderColor="#2D3748">
									TARIF
								</Th>
								<Th
									color="gray.400"
									borderColor="#2D3748"
									isNumeric
								>
									QİYMƏT
								</Th>
								<Th
									color="gray.400"
									borderColor="#2D3748"
									isNumeric
								>
									AYLIQ
								</Th>
								<Th
									color="gray.400"
									borderColor="#2D3748"
									textAlign="center"
								>
									SİL
								</Th>
							</Tr>
						</Thead>
						<Tbody color="gray.300">
							{modules && modules.length > 0 ? (
								modules.map((modul) => (
									<Tr
										key={modul.id}
										transition="0.2s"
										_hover={{
											bg: "rgba(255, 255, 255, 0.02)",
										}}
									>
										<Td
											borderColor="#2D3748"
											fontWeight="bold"
											color="white"
										>
											{modul.ad}
										</Td>
										<Td
											borderColor="#2D3748"
											isNumeric
											color="#4FD1C5"
											fontWeight="extrabold"
										>
											{modul.qiymet} AZN
										</Td>
										<Td
											borderColor="#2D3748"
											isNumeric
											color="#4FD1C5"
											fontWeight="extrabold"
										>
											{modul.ayliq} AZN
										</Td>
										<Td
											borderColor="#2D3748"
											textAlign="center"
										>
											<IconButton
												size="sm"
												icon={<MdDeleteOutline />}
												colorScheme="red"
												variant="ghost"
												onClick={() =>
													onRemoveModule(modul.id)
												}
												aria-label="Sil"
												_hover={{
													bg: "red.900",
													color: "white",
												}}
											/>
										</Td>
									</Tr>
								))
							) : (
								<Tr>
									<Td colSpan={4} textAlign="center" py={12}>
										<VStack spacing={2}>
											<Text color="gray.500">
												Heç bir tarif seçilməyib.
											</Text>
											<Text
												color="gray.600"
												fontSize="xs"
											>
												Siyahıdan yeni tarif əlavə
												edərək hesablamağa başlayın.
											</Text>
										</VStack>
									</Td>
								</Tr>
							)}
						</Tbody>
					</Table>
				</TableContainer>

				{modules && modules.length > 0 && (
					<HStack
						mt={6}
						pt={4}
						borderTop="1px solid"
						borderColor="#2D3748"
						justifyContent="space-between"
					>
						<VStack align="end" spacing={0}>
							<Text
								color="gray.500"
								fontSize="xs"
								fontWeight="bold"
								letterSpacing="widest"
							>
								AYLIQ ÜMUMİ
							</Text>
							<Text
								color="#4FD1C5"
								fontWeight="bold"
								fontSize="3xl"
							>
								{modules.reduce((sum, m) => sum + m.qiymet, 0)}{" "}
								AZN
							</Text>
						</VStack>
					</HStack>
				)}
			</Box>
		);
	},
);

ModuleTable.displayName = "ModuleTable";

export default ModuleTable;
