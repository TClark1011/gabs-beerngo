import { TopBar } from "@/components/top-bar";
import { Box } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { FC } from "react";

const RootLayout: FC = () => {
	const { share } = Route.useSearch();
	return (
		<Box w="100vw" minH="100vh">
			{!share && <TopBar />}
			<Box p="4">
				<Outlet />
			</Box>
		</Box>
	);
};

type RootSearch = {
	share?: boolean;
};

const isRootSearch = (search: unknown): search is RootSearch => {
	if (typeof search !== "object" || search === null) {
		return false;
	}

	const { share } = search as RootSearch;
	return typeof share === "boolean";
};

export const Route = createRootRoute({
	validateSearch: (search): Required<RootSearch> => {
		if (!isRootSearch(search)) {
			return {
				share: false,
			};
		}

		return {
			share: false,
			...search,
		};
	},
	component: RootLayout,
});
