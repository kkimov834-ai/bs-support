import React, { useState } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Modules from "../pages/Home";
import AIAssistant from "./AIAssistant"; // Sağ tərəfdəki panel

function Dashboard() {
	const [selectedCustomer, setSelectedCustomer] = useState(null);

	return (
		<Box minH="100vh" bg="gray.50">
			<Header
				onSelectCustomer={(customer) => setSelectedCustomer(customer)}
			/>

			<Grid
				templateColumns="80px 1fr 350px"
				templateRows="calc(100vh - 70px)"
				h="calc(100vh - 70px)"
			>
				<GridItem
					bg="white"
					borderRight="1px solid"
					borderColor="gray.200"
				>
					<Sidebar />
				</GridItem>

				<GridItem overflowY="auto" p={6}>
					<Modules customerData={selectedCustomer} />
				</GridItem>

				<GridItem
					bg="white"
					borderLeft="1px solid"
					borderColor="gray.200"
					p={4}
				>
					<AIAssistant />
				</GridItem>
			</Grid>
		</Box>
	);
}

export default React.useMemo(() => Dashboard, []);
