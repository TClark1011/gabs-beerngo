import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { BingoBoard } from "@/types";
import { generateBingoBoard, unsafeGetBeerWithId } from "@/utils/bingo-helpers";
import { produce } from "immer";
import { BEERS, BOARD_TILES } from "@/constants/data";
import { pickNRandomItems } from "@/utils/misc";

export const previouslyPlayedBeerIdsAtom = atomWithStorage<number[]>(
	"already-played-beer-ids",
	[],
);

export const playedBeersAtom = atom((get) => {
	const beerIds = get(previouslyPlayedBeerIdsAtom);

	return beerIds.map(unsafeGetBeerWithId);
});

export const unplayedBeerIdsAtom = atom((get) => {
	const playedBeerIds = get(previouslyPlayedBeerIdsAtom);

	return BEERS.filter((beer) => !playedBeerIds.includes(beer.id)).map(
		(beer) => beer.id,
	);
});

export const beerIdHasBeenPlayedAtom = (beerId: number) =>
	atom(
		(get) => get(previouslyPlayedBeerIdsAtom).includes(beerId),
		(get, set, played: boolean) => {
			const alreadyPlayedBearIds = get(previouslyPlayedBeerIdsAtom);
			const newPlayedBearIds = played
				? [...alreadyPlayedBearIds, beerId]
				: alreadyPlayedBearIds.filter((id) => id !== beerId);

			set(previouslyPlayedBeerIdsAtom, newPlayedBearIds);
		},
	);

export const toggleBeerIdPlayedAtom = atom(null, (get, set, beerId: number) => {
	const hasBeenPlayedAtom = beerIdHasBeenPlayedAtom(beerId);
	const hasBeenPlayed = get(hasBeenPlayedAtom);

	set(hasBeenPlayedAtom, !hasBeenPlayed);
});

export const bingoBoardAtom = atomWithStorage<BingoBoard>(
	"bingo-board",
	generateBingoBoard(),
);

export const bingoBoardTilesAtom = atom((get) => {
	const { tiles } = get(bingoBoardAtom);

	const sortedTiles = [...tiles].sort((a, b) => a.index - b.index);

	return sortedTiles;
});

export const regenerateBoardAtom = atom(null, (get, set) => {
	const unplayedBeerIds = get(unplayedBeerIdsAtom);

	const selectedBeerIds = pickNRandomItems(unplayedBeerIds, BOARD_TILES);

	const haveEnoughUnplayedBeers = selectedBeerIds.length >= BOARD_TILES;

	if (!haveEnoughUnplayedBeers) {
		const playedBeerIds = get(previouslyPlayedBeerIdsAtom);
		const extraBeerIds = pickNRandomItems(
			playedBeerIds,
			BOARD_TILES - selectedBeerIds.length,
		);
		const finalBeerIds = [...selectedBeerIds, ...extraBeerIds];
		set(bingoBoardAtom, {
			tiles: finalBeerIds.map((beerId, index) => ({
				beerId,
				index,
				checked: false,
			})),
		});
		return;
	}

	set(bingoBoardAtom, {
		tiles: selectedBeerIds.map((beerId, index) => ({
			beerId,
			index,
			checked: false,
		})),
	});
});

export const beerIdIsCheckedAtom = (beerId: number) =>
	atom(
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

export const toggleBeerCheckedAtom = atom(null, (get, set, beerId: number) => {
	const checkedAtom = beerIdIsCheckedAtom(beerId);

	const isChecked = get(checkedAtom);

	set(checkedAtom, !isChecked);
});

export const availableBeersAtom = atom((get) => {
	const { tiles } = get(bingoBoardAtom);

	return tiles.map((tile) => unsafeGetBeerWithId(tile.beerId));
});

export const optionsDrawerIsOpenAtom = atom(false);

export const availableBearsDrawerIsOpenAtom = atom(false);

export const beerSearchAtom = atom("");