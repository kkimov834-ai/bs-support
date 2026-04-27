import React from "react";
import {
	Box,
	Heading,
	Text,
	Input,
	Button,
	VStack,
	Spacer,
} from "@chakra-ui/react";
import Terminal from "./Terminal";

function AISection({ selectedUser }) {
	return (
		<Box
			w="500px"
			bg="#1A222B"
			borderRadius="md"
			boxShadow="md"
			p={6}
			display="flex"
			flexDirection="column"
			h="600px"
			borderRadius="12px"
			border="2px solid"
			borderColor="#4FD1C5"
			boxShadow="0 0 15px rgb(116, 254, 240), inset 0 0 5px rgba(116, 254, 24)"
		>
			<Terminal />
			<Heading as="h3" size="md" color="#E2E8F0" mb={4}>
				AI Asistan
			</Heading>

			<Box flex={1} bg="#2D3748" borderRadius="md" p={4} mb={4}>
				<Text fontSize="sm" color="#A0AEC0">
					{selectedUser
						? `Siz hazırda ${selectedUser.name} haqqında məlumat alırsınız. Nəyi bilmək istərdiniz?`
						: "Soruşmaq istədiyiniz müştərini seçin və ya ümumi sualınızı verin."}
				</Text>
			</Box>

			<VStack spacing={3}>
				<Input
					placeholder="Soruşu yazın..."
					bg="#2D3748"
					border="1px solid"
					borderColor="#4A5568"
					color="#E2E8F0"
				/>
				<Button
					variant="outline"
					borderColor="#4FD1C5"
					color="#4FD1C5"
					bg="transparent"
					_hover={{
						bg: "rgba(79, 209, 197, 0.1)",
						boxShadow: "0 0 10px rgba(79, 209, 197, 0.2)",
					}}
					w="100%"
					borderRadius="8px"
				>
					<pre>Sorğu Göndər</pre>
				</Button>
			</VStack>
		</Box>
	);
}

export default AISection;
