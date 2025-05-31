import {
	BEER_LIST_SIZE,
	BEER_SECTIONS,
	BEERS,
	LIST_EXTRA_BEERS,
} from "@/constants/data";
import { Beer, BeerReview, BingoBoard, BingoTile } from "@/types";
import { composeCompressor } from "@/utils/data-compression";
import {
	pickFirstNItems,
	pickSatisfactoryItems,
	shuffleArray,
	sortBy,
} from "@/utils/misc";

type GenerateBingoBoardInput = {
	shuffledBeers: Beer[];
	playedBeerIds: number[];
	sectionHistory: number[];
	section: number | null;
	starredBeerIds: number[];
	outOfStockBeerIds: number[];
	shuffledSections: number[];
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
	outOfStockBeerIds,
	shuffledBeers,
	shuffledSections,
}: GenerateBingoBoardInput): BingoBoard => {
	const sectionsSortedByStars = sortBy(shuffledSections, (section) => {
		const beersInSection = shuffledBeers.filter(
			(beer) => beer.section === section,
		);
		const starredBeersInSection = beersInSection.filter((beer) =>
			starredBeerIds.includes(beer.id),
		);
		return starredBeersInSection.length;
	});
	const unusedSections = sectionsSortedByStars.filter(
		(section) => !sectionHistory.includes(section),
	);
	const availableSections = unusedSections.length
		? unusedSections
		: shuffledSections;

	const selectedSection = section ?? availableSections[0];

	const beers = pickSatisfactoryItems(shuffledBeers, BEER_LIST_SIZE, [
		(beer) => !outOfStockBeerIds.includes(beer.id),
		(beer) => beer.section === selectedSection,
		(beer) => starredBeerIds.includes(beer.id),
		(beer) => !playedBeerIds.includes(beer.id),
	]);

	const finalBeerIds = beers.map((beer) => beer.id);
	const nonBoardBeerIds = pickFirstNItems(finalBeerIds, LIST_EXTRA_BEERS);

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
