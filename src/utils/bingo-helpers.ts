import { BEERS, BOARD_TILES, LIST_EXTRA_BEERS } from "@/constants/data";
import { BeerReview, BingoBoard, BingoTile } from "@/types";
import { composeCompressor } from "@/utils/data-compression";
import { pickNRandomItems, shuffleArray } from "@/utils/misc";

type GenerateBingoBoardInput = {
	playedBeerIds: number[];
	sectionHistory: number[];
};

const composeTileFromBeerId = (beerId: number, index: number): BingoTile => ({
	beerId,
	index,
	checked: false,
});

const MAX_SECTION = [...BEERS].sort(
	(a, b) => b.section - a.section
)[0].section!;

const SECTIONS = [...Array(MAX_SECTION + 1).keys()].slice(1);


export const generateBingoBoard = ({
	playedBeerIds,
	sectionHistory,
}: GenerateBingoBoardInput): BingoBoard => {
	const unusedSections = SECTIONS.filter(
		(section) => !sectionHistory.includes(section)
	);
	const availableSections = unusedSections.length
		? unusedSections
		: SECTIONS;

	const selectedSection = shuffleArray(availableSections)[0];

	if (!selectedSection) throw new Error("Unable to select section");

	const sectionBeers = BEERS.filter(
		(beer) => beer.section === selectedSection
	);

	const unplayedBeers = sectionBeers.filter(
		(beer) => !playedBeerIds.includes(beer.id),
	);

	const selectedBeerIds = pickNRandomItems(
		unplayedBeers.map((beer) => beer.id),
		BOARD_TILES + LIST_EXTRA_BEERS
	);

	const unfilledSlots = BOARD_TILES - selectedBeerIds.length;


	let extraBeerIds: number[] = [];
	if (unfilledSlots > 0) {
		const playedBeerIdsFromSection = playedBeerIds.filter(
			beerId => sectionBeers.some(beer => beer.id === beerId)
		)
		extraBeerIds = pickNRandomItems(
			playedBeerIdsFromSection,
			unfilledSlots,
		)
	}

	const finalBeerIds = [...selectedBeerIds, ...extraBeerIds];

	const nonBoardBeerIds = pickNRandomItems(
		finalBeerIds,
		LIST_EXTRA_BEERS,
	);

	return {
		tiles: shuffleArray(selectedBeerIds).map(composeTileFromBeerId),
		nonBoardBeerIds: nonBoardBeerIds,
		section: selectedSection,
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
