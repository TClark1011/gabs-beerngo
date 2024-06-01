export type Beer = {
	id: number;
	section: number;
	name: string;
	flavour: string;
	company: string;
	harry: boolean;
	state: string;
};

export type BingoTile = {
	beerId: number;
	index: number;
	checked: boolean;
};

export type BingoBoard = {
	tiles: BingoTile[];
};
