import { BEERS, BOARD_TILES, HARRY_CHOICE_QUOTA } from "@/constants/data";
import { Beer, BeerReview, BingoBoard, BingoTile } from "@/types";
import { composeCompressor } from "@/utils/data-compression";
import { splitArrayBy, pickNRandomItems, shuffleArray } from "@/utils/misc";

type GenerateBingoBoardInput = {
	playedBeerIds: number[];
};

const composeTileFromBeerId = (beerId: number, index: number): BingoTile => ({
	beerId,
	index,
	checked: false,
});

const beerIsHarryChoice = (beer: Beer) => beer.harry;

export const generateBingoBoard = ({
	playedBeerIds,
}: GenerateBingoBoardInput): BingoBoard => {
	const unplayedBeers = BEERS.filter(
		(beer) => !playedBeerIds.includes(beer.id),
	);
	const [harryBeers, nonHarryBeers] = splitArrayBy(
		unplayedBeers,
		beerIsHarryChoice,
	);

	const harryBeerIds = harryBeers.map((beer) => beer.id);
	const nonHarryBeerIds = nonHarryBeers.map((beer) => beer.id);

	const selectedHarryBeerIds = pickNRandomItems(
		harryBeerIds,
		HARRY_CHOICE_QUOTA,
	);

	const selectedNonHarryBeerIds = pickNRandomItems(
		nonHarryBeerIds,
		BOARD_TILES - selectedHarryBeerIds.length,
	);
	const selectedBeerIds = [...selectedHarryBeerIds, ...selectedNonHarryBeerIds];

	const haveEnoughUnplayedBeers = selectedBeerIds.length >= BOARD_TILES;

	if (!haveEnoughUnplayedBeers) {
		const extraBeerIds = pickNRandomItems(
			playedBeerIds,
			BOARD_TILES - selectedBeerIds.length,
		);
		const finalBeerIds = [...selectedBeerIds, ...extraBeerIds];
		return {
			tiles: shuffleArray(finalBeerIds).map(composeTileFromBeerId),
		};
	}

	return {
		tiles: shuffleArray(selectedBeerIds).map(composeTileFromBeerId),
	};
};

export const unsafeGetBeerWithId = (beerId: number) => {
	const beer = BEERS.find((beer) => beer.id === beerId);

	if (!beer) {
		throw new Error(`No beer found with id ${beerId}`);
	}

	return beer;
};

export const reviewCompressor = composeCompressor<BeerReview[]>();

export type ReviewDataSearchParams = {
	data: string;
	share?: boolean;
};

export const isReviewDataSearchParams = (
	params: unknown,
): params is ReviewDataSearchParams => {
	if (typeof params !== "object" || params === null) {
		return false;
	}

	const { data, share } = params as Record<string, unknown>;

	return (
		typeof data === "string" &&
		(share === undefined || typeof share === "boolean")
	);
};
