import { useAtomValue } from "jotai";
import { FC, useMemo } from "react";
import { BEERS, BOARD_DIMENSION } from "@/constants/data";
import { beerIdIsCheckedAtom, bingoBoardTilesAtom } from "@/stores";
import { BingoTile } from "@/types";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";

const Tile: FC<{ tile: BingoTile }> = ({ tile }) => {
	const isCheckedAtom = useMemo(
		() => beerIdIsCheckedAtom(tile.beerId),
		[tile.beerId],
	);
	const isChecked = useAtomValue(isCheckedAtom);

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
		>
			<Text fontWeight="black" opacity={isChecked ? 1 : 0}>
				{matchingBeer.id}
			</Text>
		</Button>
	);
};

export const Board = () => {
	const tiles = useAtomValue(bingoBoardTilesAtom);
	return (
		<SimpleGrid columns={BOARD_DIMENSION} gap={2}>
			{tiles.map((tile) => (
				<Tile tile={tile} key={tile.beerId} />
			))}
		</SimpleGrid>
	);
};
