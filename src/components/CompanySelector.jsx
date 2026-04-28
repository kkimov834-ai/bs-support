import React from "react";
import { Box, Select, HStack, Heading } from "@chakra-ui/react";

/**
 * CompanySelector - Şirkət seçim komponenti
 * @param {string} selectedCompany - Cari seçili şirkət
 * @param {Array} companies - Şirkətlər siyahısı
 * @param {Function} onSelectCompany - Seçim callback
 */
const CompanySelector = React.memo(
	({ selectedCompany, companies, onSelectCompany }) => {
		return (
			<HStack w="100%" spacing={4}>
				{/* Hazırda seçilmiş şirkəti göstərən qutu */}
				<Box
					bg="#1A222B"
					border="1px solid"
					borderColor="#4FD1C5"
					px={8}
					py={3}
					borderRadius="lg"
					minW="180px"
					textAlign="center"
					boxShadow="0 0 15px rgba(79, 209, 197, 0.1)"
				>
					<Heading
						size="md"
						color="#4FD1C5"
						letterSpacing="widest"
						textTransform="uppercase"
					>
						{selectedCompany || "SEÇİLMƏYİB"}
					</Heading>
				</Box>

				{/* Şirkət seçmək üçün açılır menyusu */}
				<Box
					bg="#1A222B"
					p={1}
					borderRadius="lg"
					border="1px solid"
					borderColor="#2D3748"
					w="250px"
				>
					<Select
						placeholder="Modul Seçin"
						variant="filled"
						value={selectedCompany}
						onChange={(e) => onSelectCompany(e.target.value)}
						bg="transparent"
						color="white"
						cursor="pointer"
						_hover={{ bg: "#2D3748" }}
					>
						{companies
							.filter((c) => c !== selectedCompany)
							.map((c) => (
								<option
									key={c}
									value={c}
									style={{ background: "#1A222B" }}
								>
									{c}
								</option>
							))}
					</Select>
				</Box>
			</HStack>
		);
	},
);

CompanySelector.displayName = "CompanySelector";

export default CompanySelector;
