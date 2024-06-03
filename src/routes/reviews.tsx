import { ReviewCard } from "@/components/review-card";
import { ReviewShareModal } from "@/components/review-share-modal";
import { jotaiStore, reviewShareModalIsOpenAtom } from "@/stores";
import { BeerReview } from "@/types";
import {
	ReviewDataSearchParams,
	isReviewDataSearchParams,
	reviewCompressor,
	unsafeGetBeerWithId,
} from "@/utils/bingo-helpers";
import { matchesSearchQuery } from "@/utils/misc";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Divider,
	IconButton,
	Input,
	InputGroup,
	InputRightAddon,
	Select,
	Stack,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { FC, memo, useDeferredValue, useMemo, useState } from "react";

type SortDirection = "asc" | "desc";
type SortableField = "beerId" | "score";

const sortableFieldLabels: Record<SortableField, string> = {
	beerId: "Number",
	score: "Score",
};

const ReviewList: FC<{
	reviews: BeerReview[];
	search: string;
	sortDirection: SortDirection;
	sortField: SortableField;
}> = memo(({ reviews, search, sortDirection, sortField }) => {
	const visibleReviews = useMemo(
		() =>
			reviews.filter((review) => {
				const beer = unsafeGetBeerWithId(review.beerId);
				return matchesSearchQuery({
					query: search,
					target: `${beer.name} ${beer.company} ${beer.state} ${beer.flavour} ${review.note}`,
				});
			}),
		[reviews, search],
	);

	const sorted = useMemo(() => {
		const ascending = [...visibleReviews].sort((a, b) => {
			if (sortField === "beerId") {
				return a.beerId - b.beerId;
			}

			return a.score - b.score;
		});

		return sortDirection === "asc" ? ascending : ascending.reverse();
	}, [sortDirection, sortField, visibleReviews]);

	return (
		<Stack>
			{sorted.map((review) => (
				<ReviewCard review={review} key={review.beerId} />
			))}
		</Stack>
	);
});

const ReviewPage: FC = () => {
	const reviews = Route.useLoaderData();
	const [search, setSearch] = useState("");

	const deferredSearch = useDeferredValue(search);
	const [sortField, setSortField] = useState<SortableField>("beerId");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

	const setShareModalIsOpen = useSetAtom(reviewShareModalIsOpenAtom);
	return (
		<>
			<Box>
				<Stack gap="2">
					<Input
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<InputGroup>
						<Select
							roundedRight="none"
							value={sortField}
							onChange={(e) => setSortField(e.target.value as SortableField)}
						>
							{Object.entries(sortableFieldLabels).map(([field, label]) => (
								<option key={field} value={field}>
									{label}
								</option>
							))}
						</Select>
						<InputRightAddon>
							<IconButton
								variant="unstyled"
								onClick={() =>
									setSortDirection((current) =>
										current === "asc" ? "desc" : "asc",
									)
								}
								icon={
									sortDirection === "asc" ? <ArrowDownIcon /> : <ArrowUpIcon />
								}
								aria-label="Sort Direction"
							/>
						</InputRightAddon>
					</InputGroup>
					<Button
						leftIcon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
								<path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
								<path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
								<path d="M8.7 10.7l6.6 -3.4" />
								<path d="M8.7 13.3l6.6 3.4" />
							</svg>
						}
						colorScheme="blue"
						onClick={() => setShareModalIsOpen(true)}
					>
						Share
					</Button>
				</Stack>
				<Divider my="4" />
				<ReviewList
					sortField={sortField}
					sortDirection={sortDirection}
					reviews={reviews}
					search={deferredSearch}
				/>
			</Box>
			<ReviewShareModal />
		</>
	);
};

export const Route = createFileRoute("/reviews")({
	component: ReviewPage,
	validateSearch: (search): ReviewDataSearchParams => {
		if (!isReviewDataSearchParams(search)) {
			throw new Error("Invalid search params");
		}

		return search;
	},
	loaderDeps: ({ search }) => ({ search }),
	loader: ({
		deps: {
			search: { data },
		},
	}) => reviewCompressor.decompress(data),
	onEnter: () => {
		jotaiStore.set(reviewShareModalIsOpenAtom, false);
	},
});
