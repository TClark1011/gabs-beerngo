import {
	BEER_LIST_SIZE,
	BEER_SECTIONS,
	BEERS,
	LIST_EXTRA_BEERS,
} from "@/constants/data";
import { BeerReview, BingoBoard, BingoTile } from "@/types";
import { composeCompressor } from "@/utils/data-compression";
import { pickNRandomItems, shuffleArray } from "@/utils/misc";

type GenerateBingoBoardInput = {
	playedBeerIds: number[];
	sectionHistory: number[];
	section: number | null;
	starredBeerIds: number[];
};

const composeTileFromBeerId = (beerId: number, index: number): BingoTile => ({
	beerId,
	index,
});

export const generateBingoBoard = ({
	playedBeerIds,
	sectionHistory,
	section,
	starredBeerIds,
}: GenerateBingoBoardInput): BingoBoard => {
	const unusedSections = BEER_SECTIONS.filter(
		(sec) => !sectionHistory.includes(sec),
	);
	const availableSections = unusedSections.length
		? unusedSections
		: BEER_SECTIONS;

	const selectedSection = section ?? shuffleArray(availableSections)[0];

	if (!selectedSection) throw new Error("Unable to select section");

	const sectionBeers = BEERS.filter((beer) => beer.section === selectedSection);

	const sectionStarredBeerIds = starredBeerIds
		.filter((beerId) => !playedBeerIds.includes(beerId))
		.filter((beerId) => sectionBeers.some((b) => b.id === beerId));

	const selectedStarredBeerIds = pickNRandomItems(
		sectionStarredBeerIds,
		BEER_LIST_SIZE,
	);

	const unplayedBeers = sectionBeers.filter(
		(beer) =>
			!playedBeerIds.includes(beer.id) &&
			!selectedStarredBeerIds.includes(beer.id),
	);

	const selectedBeerIds = [
		...selectedStarredBeerIds,
		...pickNRandomItems(
			unplayedBeers.map((beer) => beer.id),
			BEER_LIST_SIZE - selectedStarredBeerIds.length,
		),
	];

	const unfilledSlots = BEER_LIST_SIZE - selectedBeerIds.length;

	let extraBeerIds: number[] = [];
	if (unfilledSlots > 0) {
		const playedBeerIdsFromSection = playedBeerIds.filter(
			(beerId) =>
				sectionBeers.some((beer) => beer.id === beerId) &&
				!starredBeerIds.includes(beerId),
		);
		extraBeerIds = pickNRandomItems(playedBeerIdsFromSection, unfilledSlots);
	}

	const finalBeerIds = [...selectedBeerIds, ...extraBeerIds];

	const nonBoardBeerIds = pickNRandomItems(finalBeerIds, LIST_EXTRA_BEERS);

	return {
		tiles: shuffleArray(finalBeerIds).map(composeTileFromBeerId),
		nonBoardBeerIds: nonBoardBeerIds,
		section: selectedSection,
		checkedBeerIds: [],
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
