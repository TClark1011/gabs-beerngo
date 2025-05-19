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
	checked: boolean;
};

export type BingoBoard = {
	section: number;
	tiles: BingoTile[];
	nonBoardBeerIds: number[]; // ids of beers not on the board
};

export type BeerReview = {
	beerId: number;
	score: number;
	note: string;
};
