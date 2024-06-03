import { nonEmptyReviewsAtom, optionsDrawerIsOpenAtom } from "@/stores";
import { EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
	Button,
	DarkMode,
	Flex,
	HStack,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { FC } from "react";
import { Link, LinkProps, useMatchRoute } from "@tanstack/react-router";
import { reviewCompressor } from "@/utils/bingo-helpers";

const compressedNonEmptyReviewsAtom = atom((get) => {
	const reviews = get(nonEmptyReviewsAtom);
	const compressed = reviewCompressor.compress(reviews);
	return compressed;
});
compressedNonEmptyReviewsAtom.debugLabel = "compressedNonEmptyReviews";

const GotoReviewsButton: FC = () => {
	const compressedReviews = useAtomValue(compressedNonEmptyReviewsAtom);

	const linkProps = {
		to: "/reviews",
		search: {
			data: compressedReviews,
		},
	} as const satisfies LinkProps;

	const matchRoute = useMatchRoute();
	const reviewsRouteMatch = matchRoute({
		to: "/reviews",
	});

	return (
		<Button
			leftIcon={<EditIcon />}
			variant="link"
			as={Link}
			{...linkProps}
			isDisabled={!!reviewsRouteMatch}
		>
			Reviews
		</Button>
	);
};

export const TopBar: FC = () => {
	const setOptionsDrawerIsOpen = useSetAtom(optionsDrawerIsOpenAtom);
	const matchRoute = useMatchRoute();
	const reviewsRouteMatch = matchRoute({
		to: "/reviews",
	});

	return (
		<DarkMode>
			<Flex
				bg="gray.700"
				w="100vw"
				p="2"
				position="sticky"
				justifyContent="space-between"
				alignItems="center"
			>
				<HStack>
					<IconButton
						variant="ghost"
						icon={<SettingsIcon />}
						aria-label="Open Settings"
						onClick={() => setOptionsDrawerIsOpen(true)}
						isDisabled={!!reviewsRouteMatch}
					/>
					<GotoReviewsButton />
				</HStack>
				<Text as={Link} color="white" fontWeight="bold" fontSize="large" to="/">
					Beerngo
				</Text>
			</Flex>
		</DarkMode>
	);
};
