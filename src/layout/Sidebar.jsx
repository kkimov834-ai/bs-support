import React from "react";
import {
	Box,
	VStack,
	Link,
	Icon,
	Tooltip,
	IconButton,
	Flex,
	Spacer,
} from "@chakra-ui/react";
import {
	FaBorderAll,
	FaPhoneAlt,
	FaInfoCircle,
	FaSignOutAlt,
} from "react-icons/fa"; // FaSignOutAlt əlavə edildi

function Sidebar() {
	// Çıxış funksiyası
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<Box
			w="70px"
			bg="gray.800"
			color="white"
			py={6}
			maxh="100vh"
			boxShadow="md"
		>
			<Flex flexDirection="column" h="full" align="center">
				{/* Yuxarıdakı Menyu İkonları */}
				<VStack spacing={6} align="center">
					<Tooltip label="Modullar" placement="right" hasArrow>
						<Link
							display="flex"
							alignItems="center"
							p={2}
							borderRadius="md"
							_hover={{ bg: "gray.700" }}
						>
							<Icon as={FaBorderAll} boxSize="22px" />
						</Link>
					</Tooltip>

					<Tooltip label="Haqqımızda" placement="right" hasArrow>
						<Link
							display="flex"
							alignItems="center"
							p={2}
							borderRadius="md"
							_hover={{ bg: "gray.700" }}
						>
							<Icon as={FaInfoCircle} boxSize="22px" />
						</Link>
					</Tooltip>

					<Tooltip label="Əlaqə" placement="right" hasArrow>
						<Link
							display="flex"
							alignItems="center"
							p={2}
							borderRadius="md"
							_hover={{ bg: "gray.700" }}
						>
							<Icon as={FaPhoneAlt} boxSize="22px" />
						</Link>
					</Tooltip>
				</VStack>

				{/* Orta boşluğu doldurur */}
				<Spacer />

				{/* Ən aşağıdakı Çıxış Düyməsi (Font Awesome ilə) */}
				<Tooltip label="Çıxış et" placement="right" hasArrow>
					<IconButton
						icon={<FaSignOutAlt />}
						aria-label="Logout"
						variant="ghost"
						color="red.400"
						fontSize="22px"
						_hover={{
							bg: "whiteAlpha.200",
							transform: "scale(1.1)",
							color: "red.500",
						}}
						transition="all 0.2s"
						onClick={handleLogout}
						mb={2}
					/>
				</Tooltip>
			</Flex>
		</Box>
	);
}

export default Sidebar;
