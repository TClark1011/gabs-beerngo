import { infoModalTargetBeerIdAtom, infoModalTargetBeerAtom } from "@/stores";
import { Beer } from "@/types";
import {
	Button,
	Divider,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { FC } from "react";

type BeerInfoField = {
	label: string;
	value: string | number;
};

const composeBeerInfoFields = ({
	company,
	flavour,
	name,
	section,
	state,
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
		label: "State",
		value: state,
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
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => setTargetBeerId(null)}>Close</Button>
					</ModalFooter>
				</ModalContent>
			)}
		</Modal>
	);
};
