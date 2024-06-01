import React, { FC, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/theme";
import { DevTools } from "@/dev-tools";
import { useAtomValue } from "jotai";
import { beerReviewsAtom } from "@/stores.ts";
import { ErrorBoundary } from "react-error-boundary";

// eslint-disable-next-line react-refresh/only-export-components
const SideEffects: FC = () => {
	useAtomValue(beerReviewsAtom);
	// This is a bit of a weird hack we have to do to make
	// sure the beerReviewsAtom doesn't get garbage collected
	// when the info modal is closed.

	return null;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ErrorBoundary
			fallback={
				<div>
					<p>
						Uh oh!, there was an error. Please refresh the page and try again.
						If the problem persists, try pressing the button below to reset your
						data.
					</p>
					<button
						onClick={() => {
							if (confirm("Are you sure you want to reset your data?")) {
								localStorage.clear();
								location.reload();
							}
						}}
					>
						Reset Data
					</button>
				</div>
			}
		>
			<ChakraProvider theme={theme}>
				<Suspense>
					<DevTools />
				</Suspense>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<SideEffects />
				<App />
			</ChakraProvider>
		</ErrorBoundary>
	</React.StrictMode>,
);
