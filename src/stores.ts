import { atomWithStorage } from "jotai/utils";
import { atom, getDefaultStore } from "jotai";
import { BeerReview, BingoBoard } from "@/types";
import {
	generateBingoBoard,
	getBeerWithIdOrThrow,
} from "@/utils/bingo-helpers";
import { produce } from "immer";
import { BEERS } from "@/constants/data";
import { memoize, toggleArrayItem } from "@/utils/misc";

export const jotaiStore = getDefaultStore();

export const previouslyPlayedBeerIdsAtom = atomWithStorage<number[]>(
	"already-played-beer-ids",
	[],
);
previouslyPlayedBeerIdsAtom.debugLabel = "previouslyPlayedBeerIds";

export const playedBeersAtom = atom((get) => {
	const beerIds = get(previouslyPlayedBeerIdsAtom);

	return beerIds.map(getBeerWithIdOrThrow);
});
playedBeersAtom.debugLabel = "playedBeers";

export const unplayedBeerIdsAtom = atom((get) => {
	const playedBeerIds = get(previouslyPlayedBeerIdsAtom);

	return BEERS.filter((beer) => !playedBeerIds.includes(beer.id)).map(
		(beer) => beer.id,
	);
});
unplayedBeerIdsAtom.debugLabel = "unplayedBeerIds";

export const beerIdHasBeenPlayedAtom = memoize((beerId: number) => {
	const theAtom = atom(
		(get) => get(previouslyPlayedBeerIdsAtom).includes(beerId),
		(get, set, played: boolean) => {
			const alreadyPlayedBearIds = get(previouslyPlayedBeerIdsAtom);
			const newPlayedBearIds = played
				? [...alreadyPlayedBearIds, beerId]
				: alreadyPlayedBearIds.filter((id) => id !== beerId);

			set(previouslyPlayedBeerIdsAtom, newPlayedBearIds);
		},
	);

	theAtom.debugLabel = `beerIdHasBeenPlayed-${beerId}`;

	return theAtom;
});

export const toggleBeerIdPlayedAtom = atom(null, (get, set, beerId: number) => {
	const hasBeenPlayedAtom = beerIdHasBeenPlayedAtom(beerId);
	const hasBeenPlayed = get(hasBeenPlayedAtom);

	set(hasBeenPlayedAtom, !hasBeenPlayed);
});
toggleBeerIdPlayedAtom.debugLabel = "toggleBeerIdPlayed";

const sectionHistoryAtom = atomWithStorage<number[]>("section-history", []);
sectionHistoryAtom.debugLabel = "sectionHistory";

const BINGO_BOARD_KEY = "bingo-board";
export const bingoBoardAtom = atomWithStorage<BingoBoard>(
	BINGO_BOARD_KEY,
	generateBingoBoard({
		playedBeerIds: [],
		sectionHistory: [],
		section: null,
	}),
);
bingoBoardAtom.debugLabel = "bingoBoard";
if (!localStorage.getItem(BINGO_BOARD_KEY)) {
	// Jotai doesn't save data into local storage until it has been updated,
	// so we need to manually save the initial state
	localStorage.setItem(
		BINGO_BOARD_KEY,
		JSON.stringify(jotaiStore.get(bingoBoardAtom)),
	);
}

export const bingoBoardSectionAtom = atom((get) => get(bingoBoardAtom).section);

export const bingoBoardTilesAtom = atom((get) => {
	const { tiles, nonBoardBeerIds } = get(bingoBoardAtom);

	const visibleTiles = tiles.filter(
		(tile) => !nonBoardBeerIds.includes(tile.beerId),
	);

	const sortedTiles = [...visibleTiles].sort((a, b) => a.index - b.index);

	return sortedTiles;
});
bingoBoardTilesAtom.debugLabel = "bingoBoardTiles";

export const regenerateBoardAtom = atom(null, (get, set) => {
	set(
		bingoBoardAtom,
		generateBingoBoard({
			playedBeerIds: get(previouslyPlayedBeerIdsAtom),
			sectionHistory: get(sectionHistoryAtom),
			section: get(preferredNextSectionAtom),
		}),
	);
	const { section } = get(bingoBoardAtom);
	set(sectionHistoryAtom, (prev) => [...prev, section]);
	set(paddleBeersAtom, []);
	set(preferredNextSectionAtom, null);
});
regenerateBoardAtom.debugLabel = "regenerateBoard";

export const beerIdIsCheckedAtom = memoize((beerId: number) => {
	const theAtom = atom(
		(get) =>
			get(bingoBoardAtom).tiles.some(
				(tile) => tile.beerId === beerId && tile.checked,
			),
		(get, set, checked: boolean) => {
			const newBoard = produce(get(bingoBoardAtom), (draft) => {
				draft.tiles.forEach((tile) => {
					if (tile.beerId === beerId) {
						tile.checked = checked;
					}
				});
			});

			set(bingoBoardAtom, newBoard);
			if (checked) {
				set(beerIdHasBeenPlayedAtom(beerId), true);
			}
		},
	);

	theAtom.debugLabel = `beerIdIsChecked-${beerId}`;

	return theAtom;
});

export const toggleBeerCheckedAtom = atom(null, (get, set, beerId: number) => {
	const checkedAtom = beerIdIsCheckedAtom(beerId);

	const isChecked = get(checkedAtom);

	set(checkedAtom, !isChecked);
});
toggleBeerCheckedAtom.debugLabel = "toggleBeerChecked";

export const availableBeersAtom = atom((get) => {
	const { tiles } = get(bingoBoardAtom);

	return tiles.map((tile) => getBeerWithIdOrThrow(tile.beerId));
});
availableBeersAtom.debugLabel = "availableBeers";

export const optionsDrawerIsOpenAtom = atom(false);
optionsDrawerIsOpenAtom.debugLabel = "optionsDrawerIsOpen";

export const availableBearsDrawerIsOpenAtom = atom(false);
availableBearsDrawerIsOpenAtom.debugLabel = "availableBearsDrawerIsOpen";

export const beerSearchAtom = atom("");
beerSearchAtom.debugLabel = "beerSearch";

export const infoModalTargetBeerIdAtom = atom<number | null>(null);
infoModalTargetBeerIdAtom.debugLabel = "infoModalTargetBeerId";

export const infoModalTargetBeerAtom = atom((get) => {
	const beerId = get(infoModalTargetBeerIdAtom);

	if (!beerId) {
		return null;
	}

	return getBeerWithIdOrThrow(beerId);
});
infoModalTargetBeerAtom.debugLabel = "infoModalTargetBeer";

export const beerReviewsAtom = atomWithStorage<BeerReview[]>(
	"beer-reviews",
	BEERS.map((beer) => ({
		beerId: beer.id,
		score: 0,
		note: "",
	})),
);
beerReviewsAtom.debugLabel = "beerReviews";

type BeerReviewUpdateData = Partial<Omit<BeerReview, "beerId">>;

const updateReviewAtom = atom(
	null,
	(get, set, reviewBeerId: number, data: BeerReviewUpdateData) => {
		const reviews = get(beerReviewsAtom);

		const updatedReviews = reviews.map((review) => {
			if (review.beerId === reviewBeerId) {
				return { ...review, ...data };
			}

			return review;
		});

		set(beerReviewsAtom, updatedReviews);
	},
);
updateReviewAtom.debugLabel = "updateReview";

export const reviewWithBeerIdAtom = memoize((beerId: number) => {
	const theAtom = atom(
		(get): BeerReview => {
			const review = get(beerReviewsAtom).find(
				(review) => review.beerId === beerId,
			);

			if (!review) {
				throw new Error(`No review found for beerId: ${beerId}`);
			}

			return review;
		},
		(_, set, data: BeerReview) => {
			if (data.beerId !== beerId) throw new Error("Invalid beerId");

			set(updateReviewAtom, beerId, data);
		},
	);

	theAtom.debugLabel = `reviewWithBeerId-${beerId}`;

	return theAtom;
});

export const nonEmptyReviewsAtom = atom((get) => {
	const reviews = get(beerReviewsAtom);

	return reviews.filter((review) => review.score !== 0 || review.note !== "");
});
nonEmptyReviewsAtom.debugLabel = "nonEmptyReviews";

export const reviewShareModalIsOpenAtom = atom(false);
reviewShareModalIsOpenAtom.debugLabel = "shareReviewModalIsOpen";

const paddleBeersAtom = atomWithStorage<number[]>("paddle-beer-ids", []);
paddleBeersAtom.debugLabel = "paddleBeerIds";

export const paddleBeerIdsAtom = atom((get) => get(paddleBeersAtom));
paddleBeerIdsAtom.debugLabel = "paddleBeerIds";

export const toggleBeerIdInPaddleAtom = atom(null, (_, set, beerId: number) => {
	set(paddleBeersAtom, (prev) => toggleArrayItem(prev, beerId));
});
toggleBeerIdInPaddleAtom.debugLabel = "toggleBeerIdInPaddle";

export const beerIdIsInPaddleAtom = memoize((beerId: number) => {
	const theAtom = atom(
		(get) => get(paddleBeersAtom).includes(beerId),
		(get, set, inPaddle: boolean) => {
			const alreadyInPaddle = get(theAtom);

			if (alreadyInPaddle !== inPaddle) {
				set(toggleBeerIdInPaddleAtom, beerId);
			}
		},
	);
	theAtom.debugLabel = `beerIdIsInPaddle-${beerId}`;

	return theAtom;
});

export const preferredNextSectionAtom = atomWithStorage<number | null>(
	"preferred-next-section",
	null,
);
preferredNextSectionAtom.debugLabel = "preferredNextSection";

export const markPaddleBeersAsPlayedAtom = atom(null, (get, set) => {
	const paddleBeerIds = get(paddleBeerIdsAtom);
	paddleBeerIds.forEach((beerId) => {
		set(beerIdHasBeenPlayedAtom(beerId), true);
	});
});
