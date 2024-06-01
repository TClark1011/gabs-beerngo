import { BeerList } from "@/components/beer-list";
import { Board } from "@/components/board";
import { OptionsDrawer } from "@/components/options-drawer";
import { TopBar } from "@/components/top-bar";
import { availableBeersAtom, beerIdIsCheckedAtom } from "@/stores";
import { Box, Center } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

function App() {
	const availableBeers = useAtomValue(availableBeersAtom);
	return (
		<>
			<Box w="100vw" minH="100vh">
				<TopBar />
				<Box h="4" />
				<Center>
					<Board />
				</Center>
				<Box p="4">
					<BeerList
						beers={availableBeers}
						checkedAtomComposer={beerIdIsCheckedAtom}
					/>
				</Box>
			</Box>
			<OptionsDrawer />
		</>
	);
}

export default App;
