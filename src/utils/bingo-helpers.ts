import { BEERS, BOARD_TILES } from "@/constants/data";
import { BingoBoard, BingoTile } from "@/types";
import { pickFirstNItems, pickNRandomItems, shuffleArray } from "@/utils/misc";

export const generateBingoBoard = (): BingoBoard => {
	const selectedBeers = pickNRandomItems(BEERS, BOARD_TILES);

	const tiles: BingoTile[] = selectedBeers.map((beer, index) => ({
		beerId: beer.id,
		index,
		checked: false,
	}));

	return {
		tiles,
	};
};

export const unsafeGetBeerWithId = (beerId: number) => {
	const beer = BEERS.find((beer) => beer.id === beerId);

	if (!beer) {
		throw new Error(`No beer found with id ${beerId}`);
	}

	return beer;
};
