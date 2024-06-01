import { BEERS } from "@/constants/data";
import { Beer } from "@/types";
import { matchesSearchQuery } from "@/utils/misc";
import { Button, Checkbox, Stack, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { WritableAtom } from "jotai/experimental";
import { FC, memo, useMemo } from "react";

const BeerRow: FC<{
	beer: Beer;
	checkedAtomComposer: (id: number) => WritableAtom<boolean, [boolean], void>;
}> = ({ beer, checkedAtomComposer }) => {
	const hasBeenPlayedAtom = useMemo(
		() => checkedAtomComposer(beer.id),
		[beer.id, checkedAtomComposer],
	);
	const [hasBeenPlayed, setHasBeenPlayed] = useAtom(hasBeenPlayedAtom);

	const checkboxBorderColor = useColorModeValue("gray.300", "gray.500");

	return (
		<Button
			onClick={() => {
				setHasBeenPlayed(!hasBeenPlayed);
			}}
			textAlign="left"
			justifyContent="flex-start"
			gap="2"
			size="lg"
			whiteSpace="normal"
			h="max-content"
			py="4"
		>
			<Checkbox
				borderColor={checkboxBorderColor}
				isChecked={hasBeenPlayed}
				pointerEvents="none"
				tabIndex={-1}
			/>
			{beer.id}. {beer.name}
		</Button>
	);
};

export const BeerList: FC<{
	searchQuery?: string;
	checkedAtomComposer: (id: number) => WritableAtom<boolean, [boolean], void>;
	beers?: Beer[];
}> = memo(({ searchQuery, checkedAtomComposer, beers = BEERS }) => {
	const filteredBeers = useMemo(() => {
		if (!searchQuery) {
			return beers;
		}

		return beers.filter((beer) =>
			matchesSearchQuery({
				query: searchQuery,
				target: beer.name,
			}),
		);
	}, [searchQuery, beers]);

	const sortedAndFilteredBeers = useMemo(() => {
		return [...filteredBeers].sort((a, b) => a.id - b.id);
	}, [filteredBeers]);

	return (
		<Stack gap="4">
			{sortedAndFilteredBeers.map((beer) => (
				<BeerRow
					checkedAtomComposer={checkedAtomComposer}
					beer={beer}
					key={beer.id}
				/>
			))}
		</Stack>
	);
});
