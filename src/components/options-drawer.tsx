import { useAtom, useSetAtom } from "jotai";
import { FC, useDeferredValue } from "react";
import {
	beerIdHasBeenPlayedAtom,
	beerSearchAtom,
	optionsDrawerIsOpenAtom,
	preferredNextSectionAtom,
	regenerateBoardAtom,
} from "@/stores";
import {
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	VStack,
} from "@chakra-ui/react";
import { BeerList } from "@/components/beer-list";
import { BEER_SECTIONS } from "@/constants/data";

export const OptionsDrawer: FC = () => {
	const [isOpen, setIsOpen] = useAtom(optionsDrawerIsOpenAtom);

	const [search, setSearch] = useAtom(beerSearchAtom);
	const deferredSearch = useDeferredValue(search);

	const generateNewBoard = useSetAtom(regenerateBoardAtom);

	const [preferredNextSection, setPreferredNextSection] = useAtom(
		preferredNextSectionAtom,
	);

	return (
		<Drawer
			isOpen={isOpen}
			placement="bottom"
			onClose={() => {
				setIsOpen(false);
				setSearch("");
			}}
			preserveScrollBarGap={false}
		>
			<DrawerOverlay />
			<DrawerContent h="90vh">
				<DrawerCloseButton />
				<DrawerHeader>Options</DrawerHeader>
				<DrawerBody>
					<Flex gap={2} wrap="wrap">
						<Button
							onClick={() => {
								if (
									window.confirm(
										"WARNING: This will reset all data, it cannot be undone. Are you sure?",
									)
								) {
									localStorage.clear();
									window.location.reload();
								}
							}}
							colorScheme="red"
						>
							Reset Data
						</Button>
						<Button
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to generate a new board?",
									)
								) {
									generateNewBoard();
								}
							}}
						>
							Get New Board
						</Button>
					</Flex>
					<Divider my="8" />

					<VStack spacing="4" mb="8">
						<FormControl>
							<FormLabel htmlFor="preferred-next-section" mb="2">
								Preferred Next Section
							</FormLabel>
							<Select
								id="preferred-next-section"
								variant="filled"
								onChange={(e) => {
									const value = e.target.value;
									const asNumber = Number(value);
									if (!BEER_SECTIONS.includes(asNumber) || isNaN(asNumber)) {
										setPreferredNextSection(null);
										return;
									}

									setPreferredNextSection(asNumber);
								}}
								value={preferredNextSection ?? "null"}
							>
								<option value="null">None</option>
								{BEER_SECTIONS.map((section) => (
									<option key={section} value={section}>
										{section}
									</option>
								))}
							</Select>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="search" mb="2">
								Search
							</FormLabel>
							<Input
								id="search"
								variant="filled"
								placeholder="Search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</FormControl>
					</VStack>
					<BeerList
						getBeerIdCheckedAtom={beerIdHasBeenPlayedAtom}
						searchQuery={deferredSearch}
						showStarButton
					/>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
