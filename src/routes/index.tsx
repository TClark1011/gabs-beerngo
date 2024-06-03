import { BeerInfoModal } from "@/components/beer-info-modal";
import { BeerList } from "@/components/beer-list";
import { Board } from "@/components/board";
import { OptionsDrawer } from "@/components/options-drawer";
import { availableBeersAtom, beerIdIsCheckedAtom } from "@/stores";
import { Center } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { FC } from "react";

const MainPage: FC = () => {
	const availableBeers = useAtomValue(availableBeersAtom);
	return (
		<>
			<Center mb="4">
				<Board />
			</Center>
			<BeerList
				beers={availableBeers}
				checkedAtomComposer={beerIdIsCheckedAtom}
			/>
			<OptionsDrawer />
			<BeerInfoModal />
		</>
	);
};

export const Route = createFileRoute("/")({
	component: MainPage,
});
