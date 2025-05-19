export type Beer = {
	id: number;
	section: number;
	name: string;
	flavour: string;
	company: string;
	abv: number;
};

export type BingoTile = {
	beerId: number;
	index: number;
};

export type BingoBoard = {
	section: number;
	tiles: BingoTile[];
	nonBoardBeerIds: number[]; // ids of beers not on the board
	checkedBeerIds: number[];
};

export type BeerReview = {
	beerId: number;
	score: number;
	note: string;
};
