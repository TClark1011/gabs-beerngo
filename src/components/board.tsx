import { useAtomValue, useSetAtom } from "jotai";
import { FC, useEffect, useMemo } from "react";
import { BEERS, BOARD_DIMENSION } from "@/constants/data";
import {
	infoModalTargetBeerIdAtom,
	bingoBoardTilesAtom,
	beerIdIsCheckedAtom,
} from "@/stores";
import { BingoTile } from "@/types";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";

const Tile: FC<{ tile: BingoTile }> = ({ tile }) => {
	const setInfoModalTargetBeerId = useSetAtom(infoModalTargetBeerIdAtom);
	const isChecked = useAtomValue(beerIdIsCheckedAtom(tile.beerId));

	useEffect(() => {
		console.log("(board):", { isChecked });
	}, [isChecked]);

	const matchingBeer = useMemo(() => {
		const beer = BEERS.find((beer) => beer.id === tile.beerId);

		if (!beer) {
			throw new Error(`No beer found with id ${tile.beerId}`);
		}

		return beer;
	}, [tile.beerId]);

	return (
		<Button
			w={16}
			boxSize="16"
			rounded="md"
			p={2}
			wordBreak="break-word"
			key={tile.index}
			boxShadow="md"
			pointerEvents={isChecked ? "auto" : "none"}
			colorScheme={isChecked ? "blue" : "gray"}
			onClick={() => setInfoModalTargetBeerId(tile.beerId)}
		>
			<Text fontWeight="black" opacity={isChecked ? 1 : 0}>
				{matchingBeer.id}
			</Text>
		</Button>
	);
};

export const Board = () => {
	const tiles = useAtomValue(bingoBoardTilesAtom);

	useEffect(() => {
		console.log("(board):", { tiles });
	}, [tiles]);
	return (
		<SimpleGrid columns={BOARD_DIMENSION} gap={2}>
			{tiles.map((tile) => (
				<Tile tile={tile} key={tile.beerId} />
			))}
		</SimpleGrid>
	);
};
