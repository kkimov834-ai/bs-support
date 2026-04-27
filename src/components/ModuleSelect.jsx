import React from "react";
import { Box, Select } from "@chakra-ui/react";

/**
 * ModuleSelect - Module əlavə etmə açılır menyusu
 * @param {Array} availableModules - Bütün mövcud modullar
 * @param {Array} selectedModules - Seçili modullar
 * @param {Function} onSelectModule - Module seçim callback
 */
const ModuleSelect = React.memo(
	({ availableModules, selectedModules, onSelectModule }) => {
		return (
			<Box w="280px">
				<Select
					placeholder="+ Xidmət Əlavə Et"
					onChange={(e) => {
						onSelectModule(parseInt(e.target.value));
						e.target.value = "";
					}}
					bg="#2D3748"
					borderColor="#4FD1C5"
					color="#4FD1C5"
					fontWeight="bold"
					size="md"
					borderRadius="md"
					_hover={{
						borderColor: "#4FD1C5",
						bg: "#2D3748",
					}}
				>
					{availableModules
						.filter(
							(m) =>
								!selectedModules?.find((sm) => sm.id === m.id),
						)
						.map((m) => (
							<option
								key={m.id}
								value={m.id}
								style={{
									background: "#1A222B",
									color: "white",
								}}
							>
								{m.ad} ({m.qiymet} AZN)
							</option>
						))}
				</Select>
			</Box>
		);
	},
);

ModuleSelect.displayName = "ModuleSelect";

export default ModuleSelect;
