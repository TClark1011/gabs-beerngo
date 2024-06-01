import { optionsDrawerIsOpenAtom } from "@/stores";
import { SettingsIcon } from "@chakra-ui/icons";
import { DarkMode, Flex, IconButton, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { FC } from "react";

export const TopBar: FC = () => {
	const setOptionsDrawerIsOpen = useSetAtom(optionsDrawerIsOpenAtom);
	// const bg = useColorModeValue("gray.100", "gray.700");

	return (
		<DarkMode>
			<Flex
				bg="gray.700"
				w="100vw"
				p="2"
				position="sticky"
				justifyContent="space-between"
				alignItems="center"
			>
				<IconButton
					variant="ghost"
					icon={<SettingsIcon />}
					aria-label="Open Settings"
					onClick={() => setOptionsDrawerIsOpen(true)}
				/>
				<Text as="h1" color="white" fontWeight="bold" fontSize="large">
					Beerngo
				</Text>
			</Flex>
		</DarkMode>
	);
};
