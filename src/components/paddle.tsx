import {
	Button,
	Card,
	CardBody,
	HStack,
	Icon,
	IconButton,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { PADDLE_SIZE } from "@/constants/data";
import { fillToSize } from "@/utils/misc";
import { CheckIcon } from "@chakra-ui/icons";
import { useSetAtom } from "jotai";
import { markPaddleBeersAsPlayedAtom } from "@/stores";

export const Paddle: FC<{
	beerIds: number[];
	onToggle: (beerId: number) => void;
}> = ({ beerIds, onToggle }) => {
	const slots = useMemo(
		() => fillToSize(beerIds, PADDLE_SIZE, undefined),
		[beerIds],
	);
	const markPaddleBeersAsPlayed = useSetAtom(markPaddleBeersAsPlayedAtom);
	return (
		<Card bg="whiteAlpha.200">
			<CardBody>
				<HStack justifyContent="space-between">
					{slots.map((beerId, index) => (
						<Button
							boxSize="12"
							rounded="full"
							key={beerId ?? index}
							onClick={() => {
								if (beerId) {
									onToggle(beerId);
								}
							}}
							fontSize="xl"
						>
							{beerId ?? (
								<Icon viewBox="0 0 20 20" color="whiteAlpha.400">
									{/* Empty Circle */}
									<circle
										cx="10"
										cy="10"
										r="8"
										stroke="currentColor"
										fill="transparent"
										strokeWidth="2px"
									/>
								</Icon>
							)}
						</Button>
					))}
					<IconButton
						icon={<CheckIcon />}
						aria-label="Check paddle beers"
						colorScheme="blue"
						isRound
						onClick={markPaddleBeersAsPlayed}
						disabled={!beerIds.length}
						size="sm"
					/>
				</HStack>
			</CardBody>
		</Card>
	);
};
