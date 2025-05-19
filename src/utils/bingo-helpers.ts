import { BEERS, BOARD_TILES, LIST_EXTRA_BEERS } from "@/constants/data";
import { BeerReview, BingoBoard, BingoTile } from "@/types";
import { composeCompressor } from "@/utils/data-compression";
import { pickNRandomItems, shuffleArray } from "@/utils/misc";

type GenerateBingoBoardInput = {
	playedBeerIds: number[];
};

const composeTileFromBeerId = (beerId: number, index: number): BingoTile => ({
	beerId,
	index,
	checked: false,
});


export const generateBingoBoard = ({
	playedBeerIds,
}: GenerateBingoBoardInput): BingoBoard => {
	const unplayedBeers = BEERS.filter(
		(beer) => !playedBeerIds.includes(beer.id),
	);

	const selectedBeerIds = pickNRandomItems(
		unplayedBeers.map((beer) => beer.id),
		BOARD_TILES + LIST_EXTRA_BEERS
	);

	const unfilledSlots = BOARD_TILES - selectedBeerIds.length;

	const extraBeerIds = pickNRandomItems(
		playedBeerIds,
		unfilledSlots,
	)

	const finalBeerIds = [...selectedBeerIds, ...extraBeerIds];

	const nonBoardBeerIds = pickNRandomItems(
		finalBeerIds,
		LIST_EXTRA_BEERS,
	);

	return {
		tiles: shuffleArray(selectedBeerIds).map(composeTileFromBeerId),
		nonBoardBeerIds: nonBoardBeerIds,
	};
};

export const getBeerWithIdOrThrow = (beerId: number) => {
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
