import {
	infoModalTargetBeerIdAtom,
	infoModalTargetBeerAtom,
	reviewWithBeerIdAtom,
} from "@/stores";
import { Beer, BeerReview } from "@/types";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
	Button,
	Center,
	Divider,
	Flex,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { FC, useEffect, useMemo, useState } from "react";

const ScoreControl: FC<{
	score: number;
	onScoreChange: (score: number) => void;
}> = ({ score, onScoreChange }) => {
	return (
		<Flex alignItems="center" gap={2}>
			<IconButton
				aria-label="decrement score"
				icon={<MinusIcon />}
				onClick={() => onScoreChange(score - 1)}
				isDisabled={score <= 0}
				isRound
			/>
			<Button
				borderRadius="100%"
				boxSize={32}
				as="div"
				pointerEvents="none"
				tabIndex={-1}
				fontSize="5xl"
			>
				{score}
			</Button>
			<IconButton
				isDisabled={score >= 10}
				onClick={() => onScoreChange(score + 1)}
				icon={<AddIcon />}
				aria-label="increment"
				isRound
			/>
		</Flex>
	);
};

const ReviewSection: FC<{ beerId: number }> = ({ beerId }) => {
	const targetBeerId = useAtomValue(infoModalTargetBeerIdAtom);
	const modalIsOpen = !!targetBeerId;
	const specificReviewAtom = useMemo(
		() => reviewWithBeerIdAtom(beerId),
		[beerId],
	);
	const [review, setReview] = useAtom(specificReviewAtom);

	const [note, setNote] = useState(review.note);
	const [score, setScore] = useState(review.score);

	const localReview: BeerReview = useMemo(
		() => ({ beerId, note, score }),
		[beerId, note, score],
	);

	useEffect(() => {
		setNote(review.note);
	}, [review.note]);

	useEffect(() => {
		setScore(review.score);
	}, [review.score]);

	useEffect(() => {
		if (!modalIsOpen) {
			setReview(localReview);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalIsOpen]);

	return (
		<Stack>
			<Text fontSize="xl" fontWeight="semibold">
				Review{" "}
			</Text>
			<Center>
				<ScoreControl score={score} onScoreChange={setScore} />
			</Center>
			<Textarea
				placeholder="Note"
				value={note}
				onChange={(e) => setNote(e.target.value)}
				rows={6}
			/>
		</Stack>
	);
};

type BeerInfoField = {
	label: string;
	value: string | number;
};

const composeBeerInfoFields = ({
	company,
	flavour,
	name,
	section,
	id,
}: Beer): BeerInfoField[] => [
	{
		label: "ID",
		value: id,
	},
	{
		label: "Name",
		value: name,
	},
	{
		label: "Flavour",
		value: flavour,
	},
	{
		label: "Company",
		value: company,
	},
	{
		label: "Section",
		value: section,
	},
];

export const BeerInfoModal: FC = () => {
	const [targetBeerId, setTargetBeerId] = useAtom(infoModalTargetBeerIdAtom);
	const targetBeer = useAtomValue(infoModalTargetBeerAtom);

	return (
		<Modal isOpen={!!targetBeerId} onClose={() => setTargetBeerId(null)}>
			<ModalOverlay />
			{targetBeer && (
				<ModalContent>
					<ModalHeader>Info</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack divider={<Divider />}>
							{composeBeerInfoFields(targetBeer).map(({ label, value }) => (
								<Flex key={label}>
									<Text w="100px" flexShrink={0} fontWeight="bold">
										{label}:
									</Text>
									<Text>{value}</Text>
								</Flex>
							))}
						</Stack>
						<Divider my="4" />
						<ReviewSection beerId={targetBeer.id} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => setTargetBeerId(null)}>Close</Button>
					</ModalFooter>
				</ModalContent>
			)}
		</Modal>
	);
};
