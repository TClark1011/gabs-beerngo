/* eslint-disable @typescript-eslint/no-explicit-any */
import { BEERS } from "@/constants/data";
import {
	beerIdIsInPaddleAtom,
	beerIdIsOutOfStockAtom,
	beerIdIsStarredAtom,
	infoModalTargetBeerIdAtom,
	paddleIsFullAtom,
} from "@/stores";
import { Beer } from "@/types";
import { matchesSearchQuery } from "@/utils/misc";
import { AddIcon, InfoIcon, StarIcon } from "@chakra-ui/icons";
import {
	Button,
	Card,
	CardBody,
	Checkbox,
	Divider,
	Flex,
	HStack,
	IconButton,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useAtom, useAtomValue, useSetAtom, WritableAtom } from "jotai";
import { FC, memo, useMemo } from "react";

const BeerRow: FC<{
	beer: Beer;
	showPaddleButton: boolean;
	showStarButton: boolean;
	getBeerIdCheckedAtom: (
		beerId: number,
	) => WritableAtom<boolean, [boolean], any>;
	showOutOfStock: boolean;
}> = ({
	beer,
	showPaddleButton,
	showStarButton,
	getBeerIdCheckedAtom,
	showOutOfStock,
}) => {
	const openInfoModalForId = useSetAtom(infoModalTargetBeerIdAtom);
	const [hasBeenPlayed, setHasBeenPlayed] = useAtom(
		getBeerIdCheckedAtom(beer.id),
	);
	const [inPaddle, setInPaddle] = useAtom(beerIdIsInPaddleAtom(beer.id));
	const [isStarred, setIsStarred] = useAtom(beerIdIsStarredAtom(beer.id));
	const [isOutOfStock, setIsOutOfStock] = useAtom(
		beerIdIsOutOfStockAtom(beer.id),
	);
	const paddleIsFull = useAtomValue(paddleIsFullAtom);

	const checkboxBorderColor = useColorModeValue("gray.300", "gray.500");

	const showAsOutOfStock = useMemo(() => {
		if (showOutOfStock) return isOutOfStock;

		return false;
	}, [isOutOfStock, showOutOfStock]);

	return (
		<Flex w="full" alignItems="center" gap="2">
			<Button
				onClick={() => {
					setHasBeenPlayed(!hasBeenPlayed);
				}}
				textAlign="left"
				justifyContent="flex-start"
				size="lg"
				whiteSpace="normal"
				h="max-content"
				py="4"
				px="4"
				gap="2"
				flexGrow={1}
				disabled={showAsOutOfStock}
			>
				<Checkbox
					borderColor={checkboxBorderColor}
					isChecked={hasBeenPlayed}
					pointerEvents="none"
					tabIndex={-1}
					flexShrink={0}
				/>
				<Text
					flexGrow={1}
					textDecoration={showAsOutOfStock ? "line-through" : "none"}
				>
					{beer.id}. {beer.name}
				</Text>
			</Button>
			{showOutOfStock && (
				<Checkbox
					isChecked={isOutOfStock}
					onChange={(e) => setIsOutOfStock(e.target.checked)}
					colorScheme="red"
					mr="16px"
				/>
			)}
			<IconButton
				aria-label={`View Beer Info For ${beer.name}`}
				icon={<InfoIcon />}
				onClick={() => {
					openInfoModalForId(beer.id);
				}}
				py="4"
				isRound
				variant="outline"
			/>
			{showStarButton && (
				<IconButton
					aria-label={`${beer.name} is starred`}
					icon={
						<StarIcon
							_checked={{
								color: "gold",
							}}
							aria-checked={isStarred}
						/>
					}
					onClick={() => setIsStarred(!isStarred)}
					variant="ghost"
					isRound
				/>
			)}
			{showPaddleButton && (
				<IconButton
					aria-label={`Add ${beer.name} To Paddle`}
					icon={<AddIcon />}
					onClick={() => {
						setInPaddle(true);
					}}
					py="4"
					isRound
					variant="outline"
					disabled={inPaddle || paddleIsFull}
				/>
			)}
		</Flex>
	);
};

export const BeerList: FC<{
	searchQuery?: string;
	showPaddleButton?: boolean;
	beers?: Beer[];
	section?: number;
	showStarButton?: boolean;
	getBeerIdCheckedAtom: (
		beerId: number,
	) => WritableAtom<boolean, [boolean], any>;
	showOutOfStock?: boolean;
}> = memo(
	({
		searchQuery,
		beers = BEERS,
		section,
		showPaddleButton = false,
		showStarButton = false,
		getBeerIdCheckedAtom,
		showOutOfStock = false,
	}) => {
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
			<Stack divider={<Divider />}>
				{!!section && (
					<Card bg="whiteAlpha.200">
						<CardBody>
							<HStack>
								<Text fontWeight="bold">Section</Text>
								<Text>{section}</Text>
							</HStack>
						</CardBody>
					</Card>
				)}
				<Stack gap="4">
					{sortedAndFilteredBeers.map((beer) => (
						<BeerRow
							getBeerIdCheckedAtom={getBeerIdCheckedAtom}
							showStarButton={showStarButton}
							showPaddleButton={showPaddleButton}
							beer={beer}
							key={beer.id}
							showOutOfStock={showOutOfStock}
						/>
					))}
				</Stack>
			</Stack>
		);
	},
);
